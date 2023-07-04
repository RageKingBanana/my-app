import {Component, ElementRef, QueryList, ViewChildren} from "@angular/core";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {HttpClient} from "@angular/common/http";
import {selectedLogModel} from "../_shared/models/selectedlog.model";
import {Observable, of, tap} from "rxjs";
import {map} from "rxjs/operators";

@Component({
	selector: "app-logs",
	templateUrl: "./logs.component.html",
	styleUrls: ["./logs.component.scss"],
})
export class LogsComponent
{
	@ViewChildren("confirmModal, resultModal,exportModal") myModals!: QueryList<ElementRef>;
	employees!: any[];
	registeredUsers!: any[];
	registeredUsers2!: any[];
	sensorData$: Observable<FilteredLogsData[]> = of([]);
	sensorData2!: any[];
	selectedUID!: string;
	selectedLog: selectedLogModel = {
		checker: "",
		connected: 0,
		flame: "",
		flameStatus: "",
		loc: "",
		mq2: 0,
		mq135Status: "",
		status: "",
		StatusNotif: "",
		coordinates: "",
		deviceId: "",
		mq2status: "",
		mq135: 0,
		key: "",
		location: "",
	};
	highlighted = true;

	constructor(private afDatabase: AngularFireDatabase, private http: HttpClient)
	{

	}


//   retrievelogs() {
// //     this.afDatabase.list('/AllSensorData1').snapshotChanges().subscribe(sensorDataSnapshot => {
// //       const sensorData = sensorDataSnapshot.map(dataSnapshot => {
// //         const key = dataSnapshot.key;
// //         const value = dataSnapshot.payload.val() as Record<string, any>;
// //         return { key, ...value };
// //       });
// //       this.sensorData = sensorData;
// //       console.log(sensorData, 'sensordata');
// // this.getLocations(this.sensorData);

// //     });

// merge(
//   this.afDatabase.list('/Registered Users').snapshotChanges(),
//   this.afDatabase.list('/AllSensorData1').snapshotChanges()
// ).subscribe((sensorDataSnapshot: any[]) => {
//   const sensorData1 = sensorDataSnapshot.map((dataSnapshot) => {
//     const key = dataSnapshot.key;
//     const value = dataSnapshot.payload.val() as Record<string, any>;
//     return { key, ...value };
//   });
//   console.log(sensorData1,'sensordat1');
// });

	//  }

	async ngOnInit(): Promise<void>
	{
		await this.retrievelogs();
	}

	async retrievelogs()
	{
		this.sensorData$ = this.afDatabase.list("/Logs").snapshotChanges().pipe(
			map(sensorDataSnapshot =>
				sensorDataSnapshot.map(dataSnapshot =>
				{
					const key = dataSnapshot.key;
					const value = dataSnapshot.payload.val() as Record<string, any>;
					return {key, ...value}
				})),
			map((sensorData): FilteredLogsData[] =>
				sensorData.map(data => ({
					// @ts-ignore
					sensorDataValues: data.sensorDataValues,
					// @ts-ignore
					userData: data.userData,
					// @ts-ignore
					timestamp: data.timestamp,
				}))),
			map(sensorDataList => {
				return sensorDataList.map(({sensorDataValues, userData, timestamp}) => {

					/// Editing the cell values example
					sensorDataValues.flameStatus = sensorDataValues.flameStatus === "true" ? "FIRE" : "NO FIRE";

					return {
						sensorDataValues,
						userData,
						timestamp
					}
				})
			})
			// tap(data => {
			// 	console.log(data);
			// })
		);
	}

	// openModalConfirm(data: any) {
	//   console.log(data, 'selected data');
	//   const selectedLog = data;

	//   if (selectedLog) {
	//     const [latitude, longitude] = selectedLog.loc.split(',');
	//     const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY`;

	//     this.http.get<any>(apiUrl).subscribe(
	//       (locationData) => {
	//         if (locationData.status === 'OK' && locationData.results.length > 0) {
	//           const locationString = locationData.results[0].formatted_address;
	//           selectedLog.location = locationString;
	//           this.selectedLog = selectedLog;
	//           console.log(selectedLog.flame, 'OPENMODAL');
	//           this.selectedUID = selectedLog.userId;
	//           this.myModals.toArray()[0].nativeElement.classList.add('show');
	//           this.myModals.toArray()[0].nativeElement.style.display = 'block';
	//           document.body.classList.add('modal-open');
	//         }
	//       },
	//       (error) => {
	//         console.log('Error fetching location data:', error);
	//       }
	//     );
	//   } else {
	//     console.log('User not found', selectedLog);
	//   }
	// }

	getLocations(users: any[]): void
	{
		users.forEach(user =>
		{
			const [latitude, longitude] = user.loc.split(",");
			const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAKEou6JOvFfcgPt_G-W3cGXnGn-g8W82w`;

			this.http.get<any>(apiUrl).subscribe(
				(data) =>
				{
					if (data.status === "OK" && data.results.length > 0)
					{
						const locationString = data.results[0].formatted_address;
						user.location = locationString;
					}
				},
				(error) =>
				{
					console.log("Error fetching location data:", error);
				},
			);
		});
	}

	openModalConfirm(data: any)
	{
		console.log(data, "selected data");
		const selectedLog = data;
		if (selectedLog)
		{

			this.selectedLog = selectedLog;

			console.log(selectedLog.flame, "OPENMODAL");
			this.selectedUID = selectedLog.userId;
			this.myModals.toArray()[0].nativeElement.classList.add("show");
			this.myModals.toArray()[0].nativeElement.style.display = "block";
			document.body.classList.add("modal-open");
		}
		else
		{
			console.log("User not found", selectedLog);
		}
	}

	closeModalConfirm()
	{

		//this.searchBooklet();
		this.myModals.toArray()[0].nativeElement.classList.remove("show");
		this.myModals.toArray()[0].nativeElement.style.display = "none";
		document.body.classList.remove("modal-open");
	}


	// deleteUsersWithIdNode() {
	//   this.afDatabase.list('/Registered Users').snapshotChanges().subscribe((users) => {
	//     users.forEach((user) => {
	//       const userId = user.key; // Get the user ID

	//       const userRef = this.afDatabase.object(`/Registered Users/${userId}`);
	//       userRef.snapshotChanges().subscribe((snapshot) => {
	//         if (snapshot.payload.exists() && snapshot.payload.child('id').exists()) {
	//           userRef.remove(); // Remove the user with the 'id' node
	//         }
	//       });
	//     });
	//   });
	// }

	updateUser(hashid: string, newData: Partial<selectedLogModel>)
	{
		const userId = "Registered Users/User Id";
		const userRef = this.afDatabase.object(`${userId}/${hashid}`);

		userRef.update(newData)
			.then(() =>
			{
				console.log("User updated successfully");
			})
			.catch((error: any) =>
			{
				console.error("Error updating user:", error);
			});
	}

	toggleOpacity()
	{
		this.highlighted = !this.highlighted;
	}
}

export interface SensorDataValues
{
	checker: string
	connected: number
	flame: boolean
	flameStatus: string,
	loc: string,
	mq135: number,
	mq135Status: string,
	mq2: number,
	mq2Status: string,
	status: string,
	statusNotif: string,
}

export interface UserData
{
	[key: string]: UserDataValue;
}

interface UserDataValue
{
	coordinates: string,
	email: string,
	fullName: string,
	gender: string,
	hashid: string,
	location: string,
	mobile: string,
}

export interface FilteredLogsData
{
	sensorDataValues: SensorDataValues,
	timestamp?: number | string,
	userData: UserData
}
