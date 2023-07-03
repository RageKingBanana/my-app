import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { HttpClient } from '@angular/common/http';
import { selectedUserMode } from '../_shared/models/selecteduser.model';

@Component({
  selector: 'app-crud-user',
  templateUrl: './crud-user.component.html',
  styleUrls: ['./crud-user.component.scss']
})

export class CrudUserComponent implements OnInit{
  @ViewChildren('confirmModal, resultModal,exportModal') myModals!: QueryList<ElementRef>;
  isEditMode: boolean = false;
  employees!: any[];
  registeredUsers!: any[];
  registeredUsers2!: any[];
  sensorData!: any[];
  sensorData2!: any[];
  selectedUser: selectedUserMode = {
    location:'',
    Recordings:'',
    coordinates:'',
    email:'',
    fullName:'',
    gender:'',
    hashid:'',
    mobile:'',
  }

  constructor(private afDatabase: AngularFireDatabase, private http: HttpClient) {
    this.retrieveEmployees();
    this.retrieveRegisteredUsers();
    this.retrieveRegisteredUsers2();
    this.retrieveSensorData();
    this.retrieveSensorData2();
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  retrieveEmployees() {
    this.afDatabase.list('/Employees').valueChanges().subscribe((employees) => {
      this.employees = employees;
      this.getLocations(this.employees);
    });
  }

  retrieveRegisteredUsers() {
  //this.deleteUsersWithIdNode();
    this.afDatabase.list('/Registered Users').valueChanges().subscribe((registeredUsers) => {
      this.registeredUsers = registeredUsers;
      this.getLocations(this.registeredUsers);

    });
  }

  deleteUsersWithIdNode() {
    this.afDatabase.list('/Registered Users').snapshotChanges().subscribe((users) => {
      users.forEach((user) => {
        const userId = user.key; // Get the user ID
        
        const userRef = this.afDatabase.object(`/Registered Users/${userId}`);
        userRef.snapshotChanges().subscribe((snapshot) => {
          if (snapshot.payload.exists() && snapshot.payload.child('id').exists()) {
            userRef.remove(); // Remove the user with the 'id' node
          }
        });
      });
    });
  }
  

  retrieveRegisteredUsers2() {
    this.afDatabase.list('/Registered Users2').valueChanges().subscribe((registeredUsers2) => {
      this.registeredUsers2 = registeredUsers2;
      console.log(registeredUsers2);
      this.getLocations(this.registeredUsers2);
    });
  }

  retrieveSensorData() {
    this.afDatabase.list('/Sensor Data').valueChanges().subscribe((sensorData) => {
      this.sensorData = sensorData;
      console.log(sensorData);
    });
  }

  retrieveSensorData2() {
    this.afDatabase.list('/Sensor Data2').valueChanges().subscribe((sensorData2) => {
      this.sensorData2 = sensorData2;
    });
    
  }

  getLocations(users: any[]): void {
    users.forEach(user => {
      const [latitude, longitude] = user.coordinates.split(',');
      console.log (user.coordinates,'coords');
      const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAKEou6JOvFfcgPt_G-W3cGXnGn-g8W82w`;

      this.http.get<any>(apiUrl).subscribe(
        (data) => {
          if (data.status === 'OK' && data.results.length > 0) {
            // Assuming the first result is the most accurate one
            const locationString = data.results[0].formatted_address;
            user.location = locationString;
          }
        },
        (error) => {
          //console.log('Error fetching location data:', error);
        }
      );
    });
  }

  openModalConfirm(hashid: string) {
    const selectedUser = this.registeredUsers.find(user => user.hashid === hashid);
    if (selectedUser) {

    this.selectedUser = selectedUser;
          
    this.myModals.toArray()[0].nativeElement.classList.add('show');
    this.myModals.toArray()[0].nativeElement.style.display = 'block';
    document.body.classList.add('modal-open');
    } else {
      console.log('User not found');
    }
  }


  closeModalConfirm() {
    this.isEditMode = false;
    //this.searchBooklet();
    this.myModals.toArray()[0].nativeElement.classList.remove('show');
    this.myModals.toArray()[0].nativeElement.style.display = 'none';
    document.body.classList.remove('modal-open');
  }

  editTicket() {
    if (this.isEditMode) {

  
      this.isEditMode = false;
    } else {
      // Enter edit mode
      console.log("edit");
      this.isEditMode = true;
    }
  }
  

  highlighted = true;
  toggleOpacity() {
    this.highlighted = !this.highlighted;
  }
}
