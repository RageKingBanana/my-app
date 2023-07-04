import {Component} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {AngularFireMessaging} from "@angular/fire/compat/messaging";
import {Router} from "@angular/router";
import {firstValueFrom} from "rxjs";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
})
export class LoginComponent
{
	email!: string;
	password!: string;

	constructor(
		private afAuth: AngularFireAuth,
		private afDatabase: AngularFireDatabase,
		private afMessaging: AngularFireMessaging,
		private router: Router,
	)
	{
	}

	async onSubmit()
	{
		const {email, password} = this;

		try
		{
			const {user} = await this.afAuth.signInWithEmailAndPassword(email, password);

			if (user && user.emailVerified)
			{
				const {uid: userId} = user;
				const userRef = this.afDatabase.object(`Employees/${userId}`);

				const snapshot = await firstValueFrom(userRef.valueChanges());

				if (snapshot)
				{
					// User exists in the "Employees" node
					console.log("You are logged in now");
					this.router.navigate(['crud-user']);
					// Continue with your authentication logic

					// Get the FCM registration token
					const token = await firstValueFrom(this.afMessaging.getToken);

					if (token)
					{
						// Save the token to the Realtime Database
						const tokenRef = this.afDatabase.object(`/Employees/${userId}/token`);

						try
						{
							const tokenSetResult = await tokenRef.set(token);

							console.log("Token value set successfully.");
							
						} catch (error)
						{
							console.error("Error setting token value:", error);
						}
			
					}
				}
			}
		} catch (error)
		{
			console.error("Login error:", error);
		}
	}
}
