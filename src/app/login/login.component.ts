import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email!: string;
  password!: string;

  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) { }

  onSubmit() {
    const { email, password } = this;

    // Retrieve the employees collection from the database
    this.afDatabase.object('employees').valueChanges().subscribe((employees: any) => {
      // Find the employee with matching email and password
      const employee = Object.values(employees).find((emp: any) => emp.email === email && emp.password === password);

      if (employee) {
        // Login success, perform any desired actions
        console.log('Login successful');
      } else {
        // Login error, handle the error appropriately
        console.error('Invalid email or password');
      }
    });
  }
}
