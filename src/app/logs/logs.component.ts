import {Component, ElementRef, QueryList, ViewChildren} from "@angular/core";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {HttpClient} from "@angular/common/http";
import {selectedLogModel} from "../_shared/models/selectedlog.model";
import {Observable, of, tap} from "rxjs";
import {catchError, map} from "rxjs/operators";
import { SensorDataService } from "../services/SensorDataService";
import { stringify } from "uuid";
import 'jspdf-autotable';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'

// import autoTable from 'jspdf-autotable'
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
	sensorDataKeys!: any[];
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
		key: undefined,
		isread:'false'
	};
	highlighted = true;

	constructor(private afDatabase: AngularFireDatabase, private http: HttpClient,private sensorDataService: SensorDataService)
	{

	}



	async ngOnInit(): Promise<void>
	{
		await this.retrievelogs();
		this.retrievelogs2();
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
						// @ts-ignore
						isread:data.isread,
					});
				})),
			map(sensorDataList =>
			{
				return sensorDataList.map(({sensorDataValues, userData, timestamp,isread}) =>
				{

					/// Editing the cell values example
					sensorDataValues.flameStatus = sensorDataValues.flameStatus === "true" ? "FIRE" : "NO FIRE";
					sensorDataValues.mq2Status = sensorDataValues.mq2Status === "true" ? "GAS LEAK" : "NO GAS LEAK";
					sensorDataValues.mq135Status = sensorDataValues.mq135Status === "true" ? "SMOKE DETECTED" : "SMOKE";

					return {
						sensorDataValues,
						userData,
						timestamp,
						isread
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

  async openModalConfirm(data: FilteredLogsData, key: string)
	{
		await this.retrievelogs2(); // Wait for the keys to be retrieved
  		console.log(data, "selected data");
		console.log(key, "selected key");
		if (data)
		{

			this.selectedLog = data;
			console.log(this.selectedLog.key,'ISKEY');

	  const place =data.sensorDataValues.loc;

// Update the isread property to true for the selected log
this.afDatabase.object(`/Logs/${key}`).update({ isread: true })
.then(() => console.log('isread updated successfully in Firebase'))
.catch((error) => console.log('Error updating isread in Firebase:', error));
    //   console.log(data.sensorDataValues.loc,'SELECTED');
      this.getLocationString(place).subscribe(
        (formattedAddress) => {
          this.selectedLog.sensorDataValues.loc = formattedAddress;
        }
      );
      
			console.log(data.sensorDataValues.flame, "OPENMODAL");
			this.selectedUsers = data.userData;
			console.log(this.selectedLog.isread,'ISREAD');
			// this.selectedLog.isread = 'true'; 
			// this.afDatabase.object(`/Logs/${data.key}`).update({ isread: 'true' })
			// .then(() => console.log('isread updated successfully in Firebase'))
			// .catch((error) => console.log('Error updating isread in Firebase:', error));

			this.myModals.toArray()[0].nativeElement.classList.add("show");
			this.myModals.toArray()[0].nativeElement.style.display = "block";
			document.body.classList.add("modal-open");
		}
		else
		{
			console.log("User not found", data);
		}
	}
	


	retrievelogs2() {
	  this.afDatabase.list('/Logs').snapshotChanges().subscribe(sensorDataSnapshot => {
		this.sensorDataKeys = sensorDataSnapshot
		  .map(dataSnapshot => dataSnapshot.key)
		  .filter(key => !!key); // Filter out null values
		// console.log(this.sensorDataKeys, 'sensordata keys');
	  });
	}
	
	  

	closeModalConfirm()
	{

		//this.searchBooklet();
		this.myModals.toArray()[0].nativeElement.classList.remove("show");
		this.myModals.toArray()[0].nativeElement.style.display = "none";
		document.body.classList.remove("modal-open");
	}

	exportPdf() {
		//this.loadingmodal();
	  
		const doc = new jsPDF();
	  
		// Add the text "PYRONNOIA LOGS"
		doc.setFontSize(18);
		doc.text('PYRONNOIA LOGS', 70, 20); // Adjust the positioning of the text
	  
		// Add an image
		const logo = new Image();
		logo.src = 'assets/images/pyroicon.png';
		logo.onload = () => {
		  doc.addImage(logo, 'PNG', 10, 10, 25, 25); // Adjust the positioning and size as needed
		  generateTable(); // Generate the table after the image is loaded
		};
	  
		// Function to generate the table
		const generateTable = () => {
		  const table = document.createElement('table');
		  table.className = 'table-borderless';
		  table.style.width = '100%';
	  
		  const tbody = document.createElement('tbody');
	  
		  // Add the table rows with the modal data
		  const rows = [
			{ label: 'Time Stamp:', value: this.selectedLog.timestamp || 'No TIME' },
			{ label: 'Location:', value: this.selectedLog.sensorDataValues.loc || 'N/A' },
			{ label: 'Flame Sensor:', value: this.selectedLog.sensorDataValues.flame ? 'True' : 'False' },
			{ label: 'MQ2 Sensor:', value: this.selectedLog.sensorDataValues.mq2 || 'N/A' },
			{ label: 'MQ135 Sensor:', value: this.selectedLog.sensorDataValues.mq135 || 'N/A' },
			{ label: 'Users', value: this.selectedLog.userData.map((user) => user.fullName).join(', ') },
			{ label: 'Email', value: this.selectedLog.userData.map((user) => user.email).join(', ') },
			{ label: 'Mobile No.', value: this.selectedLog.userData.map((user) => user.mobile).join(', ') },
		  ];
	  
		  rows.forEach((row) => {
			const tr = document.createElement('tr');
			const tdLabel = document.createElement('td');
			const tdValue = document.createElement('td');
	  
			tdLabel.style.fontSize = '20px';
			tdLabel.className = 'fw-bold';
			tdLabel.innerText = row.label;
			tdValue.style.fontSize = '20px';
			tdValue.innerText = row.value.toString();
	  
			tr.appendChild(tdLabel);
			tr.appendChild(tdValue);
			tbody.appendChild(tr);
		  });
	  
		  table.appendChild(tbody);
	  
		  // Export the table to PDF
		  autoTable(doc, {
			html: table,
			startY: 50, // Adjust the startY value to leave space for the text and image
			styles: {
			  fontSize: 15,
			},
		  });
	  
		  doc.save('PyronnoiaReport.pdf');
	  
		  //this.closeLoadingModal();
		};
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
	userData: UserData[],
	isread?:string
}
