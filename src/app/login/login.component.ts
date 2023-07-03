import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email!: string;
  password!: string;

  constructor(private afDatabase: AngularFireDatabase) { }

  onSubmit() {
    const { email, password } = this;
    this.afDatabase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        // Login success, perform any desired actions
        console.log('Login successful');
      })
      .catch((error) => {
        // Login error, handle the error appropriately
        console.error('Login error:', error);
      });
  }
}
