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
    this.retrieveRegisteredUsers();
    this.retrieveRegisteredUsers2();
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
      // this.getLocations(this.registeredUsers2);
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
      // this.getLocations(this.registeredUsers);
    });
  }
  

  // getLocations(users: any[]): void {
  //   users.forEach(user => {
  //     const [latitude, longitude] = user.coordinates.split(',');
  //     console.log (user.coordinates,'coords');
  //     const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAKEou6JOvFfcgPt_G-W3cGXnGn-g8W82w`;

  //     this.http.get<any>(apiUrl).subscribe(
  //       (data) => {
  //         if (data.status === 'OK' && data.results.length > 0) {
  //           // Assuming the first result is the most accurate one
  //           const locationString = data.results[0].formatted_address;
  //           user.location = locationString;
  //         }
  //       },
  //       (error) => {
  //         //console.log('Error fetching location data:', error);
  //       }
  //     );
  //   });
  // }

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

  openModalConfirm2(userid: string) {
    const selectedUser = this.registeredUsers2.find(user => user.userId === userid);
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
      console.log(this.selectedUser.userId, 'EDIT MODE');
      const userId = this.selectedUser.userId;
      let user = this.registeredUsers.find(u => u.userId === userId);
      let databasePath = '/Registered Users';
  
      if (!user) {
        user = this.registeredUsers2.find(u => u.userId === userId);
        databasePath = '/Registered Users2';
      }
  
      console.log(user?.userId, 'before get');
  
      if (user) {
        const firebaseId = user.userId;
        if (firebaseId) {
          const userData = {
            coordinates: this.selectedUser.coordinates,
            email: this.selectedUser.email,
            fullName: this.selectedUser.fullName,
            gender: this.selectedUser.gender,
            mobile: this.selectedUser.mobile
          };
  
          if (databasePath === '/Registered Users') {
            this.afDatabase.object(`${databasePath}/${firebaseId}`).update(userData)
              .then(() => {
                console.log('User updated successfully in Registered Users.');
                this.isEditMode = false;
              })
              .catch((error) => {
                console.error('Error updating user in Registered Users:', error);
                // Handle error
              });
          } else if (databasePath === '/Registered Users2') {
            this.afDatabase.object(`${databasePath}/${firebaseId}`).update(userData)
              .then(() => {
                console.log('User updated successfully in Registered Users2.');
                this.isEditMode = false;
              })
              .catch((error) => {
                console.error('Error updating user in Registered Users2:', error);
                // Handle error
              });
          }
        } else {
          console.log('Firebase ID not found for the user.');
        }
      } else {
        console.log('User not found');
      }
    } else {
      // Enter edit mode
      console.log('edit');
      console.log(this.selectedUser.userId, 'EDIT MODE');
      this.isEditMode = true;
    }
  }

  deleteTicket() {
    const userId = this.selectedUser.userId;
    let user = this.registeredUsers.find(u => u.userId === userId);
    let databasePath = '/Registered Users';
  
    if (!user) {
      user = this.registeredUsers2.find(u => u.userId === userId);
      databasePath = '/Registered Users2';
    }
  
    if (user) {
      const firebaseId = user.userId;
      if (firebaseId) {
        this.afDatabase.object(`${databasePath}/${firebaseId}`).remove()
          .then(() => {
            console.log(`User deleted successfully from ${databasePath}.`);
          })
          .catch((error) => {
            console.error('Error deleting user:', error);
            // Handle error
          });
      } else {
        console.log('Firebase ID not found for the user.');
      }
    } else {
      console.log('User not found');
    }
    this.closeModalConfirm();
  }
  
  
  

  highlighted = true;
  toggleOpacity() {
    this.highlighted = !this.highlighted;
  }
}
