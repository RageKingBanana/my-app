import {Component, ElementRef, QueryList, ViewChildren} from "@angular/core";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {HttpClient} from "@angular/common/http";
import {selectedLogModel} from "../_shared/models/selectedlog.model";
import {Observable, of, tap} from "rxjs";
import {catchError, map} from "rxjs/operators";
import { SensorDataService } from "../services/SensorDataService";

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
  selectedLocation!:string;
	selectedUsers: UserData[] = [];
	selectedLog: FilteredLogsData = {
		userData: [],
		sensorDataValues: {
			mq2Status: "",
			mq135Status: "",
			flameStatus: "",
			flame: false,
			loc: "",
			mq2: 0,
			mq135: 0,
			statusNotif: "",
			status: "",
			connected: 0,
			checker: "",
		},
		timestamp: undefined,
		key: undefined
	};
	highlighted = true;

	constructor(private afDatabase: AngularFireDatabase, private http: HttpClient,private sensorDataService: SensorDataService)
	{

	}



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
					return {key, ...value};
				})),
			tap(rawData => console.log({rawData})),
			map((sensorData): FilteredLogsData[] =>
				sensorData.map(data =>
				{
					// @ts-ignore
					const userData = Object.keys(data.userData).map(key =>
					{
						// @ts-ignore
						const value = data.userData[key];
						return {
							key,
							...value,
						};
					});

					return ({
						// @ts-ignore
						key: data.key ?? undefined,
						// @ts-ignore
						sensorDataValues: data.sensorDataValues,
						// @ts-ignore
						userData,
						// @ts-ignore
						timestamp: data.timestamp,
					});
				})),
			map(sensorDataList =>
			{
				return sensorDataList.map(({sensorDataValues, userData, timestamp}) =>
				{

					/// Editing the cell values example
					sensorDataValues.flameStatus = sensorDataValues.flameStatus === "true" ? "FIRE" : "NO FIRE";

					return {
						sensorDataValues,
						userData,
						timestamp,
					};
				});
			}),
			tap(finalData =>
			{
				console.log({finalData});
			}),
		);
		this.sensorData$.subscribe((sensorDataList: FilteredLogsData[]) => {
			this.sensorDataService.setSensorData(sensorDataList);
		  });
	}


  getLocationString(coordinates: string): Observable<string> {
    if (!coordinates) {
      return of('');
    }
  
    const [latitude, longitude] = coordinates.split(',');
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAKEou6JOvFfcgPt_G-W3cGXnGn-g8W82w`;
  
    return this.http.get<any>(apiUrl).pipe(
      map((data) => {
        if (data.status === 'OK' && data.results.length > 0) {
          return data.results[0].formatted_address;
        } else {
          throw new Error('Unable to fetch location data');
        }
      }),
      catchError((error) => {
        console.log('Error fetching location data:', error);
        return of('N/A');
      })
    );
  }

	openModalConfirm(data: FilteredLogsData)
	{
		console.log(data, "selected data");
		if (data)
		{

			this.selectedLog = data;
      const place =data.sensorDataValues.loc;
      console.log(place,'SELECTED');
      console.log(data.sensorDataValues.loc,'SELECTED');
      this.getLocationString(place).subscribe(
        (formattedAddress) => {
          this.selectedLog.sensorDataValues.loc = formattedAddress;
        }
      );
      
			console.log(data.sensorDataValues.flame, "OPENMODAL");
			this.selectedUsers = data.userData;
			this.myModals.toArray()[0].nativeElement.classList.add("show");
			this.myModals.toArray()[0].nativeElement.style.display = "block";
			document.body.classList.add("modal-open");
		}
		else
		{
			console.log("User not found", data);
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
	key: string,
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
	key?: string,
	sensorDataValues: SensorDataValues,
	timestamp?: number | string,
	userData: UserData[]
}
