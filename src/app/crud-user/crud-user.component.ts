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
  selectedUID!:string;
  selectedUser: selectedUserMode = {
    location:'',
    Recordings:'',
    coordinates:'',
    email:'',
    fullName:'',
    gender:'',
    hashid:'',
    mobile:'',
    userId:'',
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


  retrieveRegisteredUsers2() {
    this.afDatabase.list('/Registered Users2').snapshotChanges().subscribe(usersSnapshot => {
      const registeredUsers2 = usersSnapshot.map(userSnapshot => {
        const userId = userSnapshot.key;
        const userData = userSnapshot.payload.val() as Record<string, any>;
        return { userId, ...userData };
      });
      console.log(registeredUsers2,'REG2ITO');
      this.registeredUsers2 = registeredUsers2;
      this.getLocations(this.registeredUsers2);
    });
  }
  retrieveEmployees() {
    this.afDatabase.list('/Employees').snapshotChanges().subscribe(employeesSnapshot => {
      const employees = employeesSnapshot.map(employeeSnapshot => {
        const employeeId = employeeSnapshot.key;
        const employeeData = employeeSnapshot.payload.val() as Record<string, any>;
        return { employeeId, ...employeeData };
      });
      this.employees = employees;
      this.getLocations(this.employees);
    });
  }
  
  retrieveRegisteredUsers() {
    this.afDatabase.list('/Registered Users').snapshotChanges().subscribe(usersSnapshot => {
      const registeredUsers = usersSnapshot.map(userSnapshot => {
        const userId = userSnapshot.key;
        const userData = userSnapshot.payload.val() as Record<string, any>;
        return { userId, ...userData };
      });
      this.registeredUsers = registeredUsers;
      this.getLocations(this.registeredUsers);
    });
  }
  
  retrieveSensorData() {
    this.afDatabase.list('/Sensor Data').snapshotChanges().subscribe(sensorDataSnapshot => {
      const sensorData = sensorDataSnapshot.map(dataSnapshot => {
        const key = dataSnapshot.key;
        const value = dataSnapshot.payload.val() as Record<string, any>;
        return { key, ...value };
      });
      this.sensorData = sensorData;
      console.log(sensorData);
    });
  }
  
  retrieveSensorData2() {
    this.afDatabase.list('/Sensor Data2').snapshotChanges().subscribe(sensorDataSnapshot => {
      const sensorData2 = sensorDataSnapshot.map(dataSnapshot => {
        const key = dataSnapshot.key;
        const value = dataSnapshot.payload.val() as Record<string, any>;
        return { key, ...value };
      });
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

  openModalConfirm(userid: string) {
    const selectedUser = this.registeredUsers.find(user => user.userId === userid);
    if (selectedUser) {

    this.selectedUser = selectedUser;
          console.log(selectedUser.userId,'OPENMODAL');
    this.selectedUID=selectedUser.userId;
    this.myModals.toArray()[0].nativeElement.classList.add('show');
    this.myModals.toArray()[0].nativeElement.style.display = 'block';
    document.body.classList.add('modal-open');
    } else {
      console.log('User not found',selectedUser);
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
      
      const userId = this.selectedUser.userId;
  
      // Find the user with the matching userId
      const user = this.registeredUsers.find(u => u.userId === userId);
  console.log(user.userId,'bago mag get')
      if (user) {
        // Get the Firebase ID (auto-generated) for the user
        const firebaseId = user.userId;
  
        if (firebaseId) {
          // Update the user data
          const userData = {
            location: this.selectedUser.location,
            Recordings: this.selectedUser.Recordings,
            coordinates: this.selectedUser.coordinates,
            email: this.selectedUser.email,
            fullName: this.selectedUser.fullName,
            gender: this.selectedUser.gender,
            mobile: this.selectedUser.mobile
          };
  
          // Save changes to the Firebase database using the Firebase ID and userId as reference
          this.afDatabase.object(`/Registered Users/${firebaseId}`).update(userData)
            .then(() => {
              console.log('User updated successfully.');
              this.isEditMode = false;
            })
            .catch((error) => {
              console.error('Error updating user:', error);
              // Handle error
            });
        } else {
          console.log('Firebase ID not found for the user.');
        }
      } else {
        console.log('User not found');
      }
    } else {
      // Enter edit mode
      console.log("edit");
      this.isEditMode = true;
    }
  }
  

  updateUser(hashid: string, newData: Partial<selectedUserMode>) {
    const userId = 'Registered Users/User Id';
    const userRef = this.afDatabase.object(`${userId}/${hashid}`);
    
    userRef.update(newData)
      .then(() => {
        console.log('User updated successfully');
      })
      .catch((error: any) => {
        console.error('Error updating user:', error);
      });
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
  

  highlighted = true;
  toggleOpacity() {
    this.highlighted = !this.highlighted;
  }
}
