import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
@Component({
  selector: 'app-crud-user',
  templateUrl: './crud-user.component.html',
  styleUrls: ['./crud-user.component.scss']
})
export class CrudUserComponent {
  employees!: any[];
  registeredUsers!: any[];
  registeredUsers2!: any[];
  sensorData!: any[];
  sensorData2!: any[];

  constructor(private afDatabase: AngularFireDatabase) {
    this.retrieveEmployees();
    this.retrieveRegisteredUsers();
    this.retrieveRegisteredUsers2();
    this.retrieveSensorData();
    this.retrieveSensorData2();
  }

  retrieveEmployees() {
    this.afDatabase.list('/Employees').valueChanges().subscribe((employees) => {
      this.employees = employees;
    });
  }

  retrieveRegisteredUsers() {
    this.afDatabase.list('/Registered Users').valueChanges().subscribe((registeredUsers) => {
      this.registeredUsers = registeredUsers;
    });
  }

  retrieveRegisteredUsers2() {
    this.afDatabase.list('/Registered Users2').valueChanges().subscribe((registeredUsers2) => {
      this.registeredUsers2 = registeredUsers2;
      console.log(registeredUsers2);
    });
  }

  retrieveSensorData() {
    this.afDatabase.list('/Sensor Data').valueChanges().subscribe((sensorData) => {
      this.sensorData = sensorData;
    });
  }

  retrieveSensorData2() {
    this.afDatabase.list('/Sensor Data2').valueChanges().subscribe((sensorData2) => {
      this.sensorData2 = sensorData2;
    });
  }

  highlighted = true;
toggleOpacity() {
  this.highlighted = !this.highlighted;
}

}

