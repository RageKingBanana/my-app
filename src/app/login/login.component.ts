<<<<<<< Updated upstream
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email!: string;
  password!: string;
=======
import { Component } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { AngularFireMessaging } from "@angular/fire/compat/messaging";
import { Router } from "@angular/router";
import { firstValueFrom } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  loginModel = {
    Username: "",
    Password: "",
  };
  errorMessage = "";
  isLoading = false;
>>>>>>> Stashed changes

  constructor(
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private afMessaging: AngularFireMessaging,
    private router: Router
  ) {}

<<<<<<< Updated upstream
  async onSubmit() {
    const { email, password } = this;

    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
=======
  async login() {
    const { Username, Password } = this.loginModel;

    try {
      this.isLoading = true;
      const { user } = await this.afAuth.signInWithEmailAndPassword(
        Username,
        Password
>>>>>>> Stashed changes
      );

      if (user && user.emailVerified) {
        const { uid: userId } = user;
        const userRef = this.afDatabase.object(`Employees/${userId}`);

        const snapshot = await firstValueFrom(userRef.valueChanges());

        if (snapshot) {
<<<<<<< Updated upstream
          // User exists in the "Employees" node
          console.log('You are logged in now');
          this.router.navigate(['crud-user']);
          // Continue with your authentication logic

          // Get the FCM registration token
          const token = await firstValueFrom(this.afMessaging.getToken);

          if (token) {
            // Save the token to the Realtime Database
=======
          console.log("You are logged in now");
          this.router.navigate(["crud-user"]);

          const token = await firstValueFrom(this.afMessaging.getToken);

          if (token) {
>>>>>>> Stashed changes
            const tokenRef = this.afDatabase.object(
              `/Employees/${userId}/token`
            );

            try {
              const tokenSetResult = await tokenRef.set(token);

<<<<<<< Updated upstream
              console.log('Token value set successfully.');
            } catch (error) {
              console.error('Error setting token value:', error);
=======
              console.log("Token value set successfully.");
            } catch (error) {
              console.error("Error setting token value:", error);
>>>>>>> Stashed changes
            }
          }
        }
      }
    } catch (error) {
<<<<<<< Updated upstream
      console.error('Login error:', error);
    }
  }
=======
		console.error("Login error:", error);
		this.errorMessage = (error as { message: string }).message;
	  }
	  finally {
      this.isLoading = false;
    }
  }

  hasError(control: any) {
    return control.invalid && (control.dirty || control.touched);
  }
>>>>>>> Stashed changes
}
