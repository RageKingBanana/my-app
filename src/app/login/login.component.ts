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

  constructor(
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private afMessaging: AngularFireMessaging,
    private router: Router
  ) {}

  async login() {
    const { Username, Password } = this.loginModel;

    try {
      this.isLoading = true;
      const { user } = await this.afAuth.signInWithEmailAndPassword(
        Username,
        Password
      );

      if (user && user.emailVerified) {
        const { uid: userId } = user;
        const userRef = this.afDatabase.object(`Employees/${userId}`);

        const snapshot = await firstValueFrom(userRef.valueChanges());

        if (snapshot) {
          console.log("You are logged in now");
          this.router.navigate(["logs"]);

          const token = await firstValueFrom(this.afMessaging.getToken);

          if (token) {
            const tokenRef = this.afDatabase.object(
              `/Employees/${userId}/token`
            );

            try {
              const tokenSetResult = await tokenRef.set(token);

              console.log("Token value set successfully.");
            } catch (error) {
              console.error("Error setting token value:", error);
            }
          }
        }
      }
    } catch (error) {
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
}
