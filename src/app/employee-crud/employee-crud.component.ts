import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { HttpClient } from '@angular/common/http';
import { selectedUserMode } from '../_shared/models/selecteduser.model';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { selectedEmployeeModel } from '../_shared/models/selectedemployee.model';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import angular from 'angular';
import angularFire from 'angularfire';


@Component({
  selector: 'app-employee-crud',
  templateUrl: './employee-crud.component.html',
  styleUrls: ['./employee-crud.component.scss']
})
export class EmployeeCrudComponent implements OnInit {
  @ViewChildren('confirmModal, resultModal,exportModal,addModal') myModals!: QueryList<ElementRef>;
  isEditMode: boolean = false;
  employees!: any[];
  registeredUsers!: any[];
  registeredUsers2!: any[];
  sensorData!: any[];
  sensorData2!: any[];
  selectedUID!:string;
  selectedUser: selectedEmployeeModel = {
    coordinates: '',
    email: '',
    fullName: '',
    gender: '',
    hashid: '',
    mobile: '',
    location: '',
    userId: '',
    employeeId: ''
  }

  constructor(private afDatabase: AngularFireDatabase, private http: HttpClient) {
    this.retrieveEmployees();
    // this.retrieveSensorData();
    // this.retrieveSensorData2();
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  addEmployee() {
    const userData = {
      location: this.selectedUser.location,
      coordinates: this.selectedUser.coordinates,
      email: this.selectedUser.email,
      fullName: this.selectedUser.fullName,
      gender: this.selectedUser.gender,
      mobile: this.selectedUser.mobile
    };
  
    // Generate a new Firebase ID for the user
    const firebaseId = this.afDatabase.createPushId();
  
    // Save the new user data to the "Registered Users" database
    this.afDatabase.object(`/Employees/${firebaseId}`).set(userData)
      .then(() => {
        console.log('User added successfully to Employees.');
        this.closeAddModal();
        this.openModalResult(true);
      })
      .catch((error) => {
        console.error('Error adding user:', error);
        // Handle error
        this.closeAddModal();
        this.openModalResult(false);
      });
  }
  openAddModal() {
    this.myModals.toArray()[2].nativeElement.classList.add('show');
    this.myModals.toArray()[2].nativeElement.style.display = 'block';
    document.body.classList.add('modal-open');
    
  }

  // closeAddModal() {
  //   this.myModals[2].nativeElement.classList.remove('show');
  //   this.myModals[2].nativeElement.style.display = 'none';
  //   document.body.classList.remove('modal-open');
  // }
  
  closeAddModal() {
    this.myModals.toArray()[2].nativeElement.classList.remove('show');
    this.myModals.toArray()[2].nativeElement.style.display = 'none';
    document.body.classList.remove('modal-open');
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

  openModalConfirm(employeeId: string) {
    const selectedUser = this.employees.find(user => user.employeeId === employeeId);
    if (selectedUser) {
      this.selectedUser = selectedUser;
      console.log(selectedUser.employeeId, 'OPENMODAL');
      this.selectedUID = selectedUser.employeeId;
      this.myModals.toArray()[0].nativeElement.classList.add('show');
      this.myModals.toArray()[0].nativeElement.style.display = 'block';
      document.body.classList.add('modal-open');
    } else {
      console.log('User not found', selectedUser);
    }
  }

  closeModalConfirm() {
    this.isEditMode = false;
    this.myModals.toArray()[0].nativeElement.classList.remove('show');
    this.myModals.toArray()[0].nativeElement.style.display = 'none';
    document.body.classList.remove('modal-open');
  }

  editTicket() {
    if (this.isEditMode) {
      const employeeId = this.selectedUser.employeeId;
  
      // Find the employee with the matching employeeId
      const employee = this.employees.find(e => e.employeeId === employeeId);
  
      if (employee) {
        // Get the Firebase ID (auto-generated) for the employee
        const firebaseId = employee.employeeId;
  
        if (firebaseId) {
          // Update the employee data
          const employeeData = {
            location: this.selectedUser.location,
            coordinates: this.selectedUser.coordinates,
            email: this.selectedUser.email,
            fullName: this.selectedUser.fullName,
            gender: this.selectedUser.gender,
            mobile: this.selectedUser.mobile
          };
  
          // Save changes to the Firebase database using the Firebase ID and employeeId as reference
          this.afDatabase.object(`/Employees/${firebaseId}`).update(employeeData)
            .then(() => {
              console.log('Employee updated successfully.');
              this.isEditMode = false;
              this.closeModalConfirm();
              this.openModalResult(true);
            })
            .catch((error) => {
              console.error('Error updating employee:', error);
              // Handle error
            });
        } else {
          console.log('Firebase ID not found for the employee.');
          this.closeModalConfirm();
          this.openModalResult(false);
        }
      } else {
        console.log('Employee not found');
        this.closeModalConfirm();
        this.openModalResult(false);
      }
    } else {
      // Enter edit mode
      console.log("edit");
      this.isEditMode = true;
    }
  }
  

  deleteEmployee() {
    const employeeId = this.selectedUser.employeeId;
  
    // Find the employee with the matching employeeId
    const employee = this.employees.find(e => e.employeeId === employeeId);
  
    if (employee) {
      // Get the Firebase ID (auto-generated) for the employee
      const firebaseId = employee.employeeId;
  
      if (firebaseId) {
        // Remove the employee from the Firebase database using the Firebase ID
        this.afDatabase.object(`/Employees/${firebaseId}`).remove()
          .then(() => {
            console.log('Employee deleted successfully.');
            this.closeModalConfirm();
            this.openModalResult(true);
          })
          .catch((error) => {
            console.error('Error deleting employee:', error);
            // Handle error
            this.closeModalConfirm();
            this.openModalResult(false);
          });
      } else {
        console.log('Firebase ID not found for the employee.');
        this.closeModalConfirm();
        this.openModalResult(false);
      }
    } else {
      console.log('Employee not found');
      this.closeModalConfirm();
      this.openModalResult(false);
    }
  }
  
  
  openModalResult(success: boolean): void {
    this.myModals.toArray()[1].nativeElement.classList.add('show');
    this.myModals.toArray()[1].nativeElement.style.display = 'block';
    document.body.classList.add('modal-open');

    const successElement = document.getElementById("update-success");
    const failElement = document.getElementById("update-fail");

    if (success) {
      if (successElement) {
        successElement.style.display = "inline";
      }
      if (failElement) {
        failElement.style.display = "none";
      }
    } else {
      if (successElement) {
        successElement.style.display = "none";
      }
      if (failElement) {
        failElement.style.display = "inline";
      }
    }
  }

  closeModalResult(): void {
    this.myModals.toArray()[1].nativeElement.classList.remove('show');
    this.myModals.toArray()[1].nativeElement.style.display = 'none';
    document.body.classList.remove('modal-open');
  }

  signUp(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User account created successfully
        const user = userCredential.user;
        
        // Send email verification
        user.sendEmailVerification()
          .then(() => {
            // Email verification sent
            console.log('Email verification sent');
          })
          .catch((error) => {
            // Error sending email verification
            console.error('Error sending email verification:', error);
          });
      })
      .catch((error) => {
        // Error creating user account
        console.error('Error creating user account:', error);
      });
  }
  
  

  highlighted = true;
  toggleOpacity() {
    this.highlighted = !this.highlighted;
  }


  
}
