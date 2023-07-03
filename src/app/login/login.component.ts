import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email!: string;
  password!: string;

  constructor(
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private afMessaging: AngularFireMessaging,
    private router: Router
  ) {}

  onSubmit() {
    const { email, password } = this;
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user && user.emailVerified) {
          const userId = user.uid;
          const userRef = this.afDatabase.object(`Employees/${userId}`);
          userRef.valueChanges().subscribe((snapshot) => {
            if (snapshot) {
              // User exists in the "Employees" node
              console.log('You are logged in now');
              // Continue with your authentication logic

              // Get the FCM registration token
              this.afMessaging.getToken.subscribe((token: any) => {
                // Save the token to the Realtime Database
                const tokenRef = this.afDatabase.object(`/Employees/${userId}/token`);
                tokenRef.set(token).then(() => {
                  console.log('Token value set successfully.');
                }).catch((error) => {
                  console.error('Error setting token value:', error);
                });
              });

              this.router.navigate(['/notifications']);
            } else {
              // User does not exist in the "Employees" node
              console.log('User not found in Employees');
              // Handle accordingly (e.g., show an error message, prevent login)
            }
          });
        } else if (user) {
          user.sendEmailVerification();
          this.afAuth.signOut();
          // Show email verification message to the user
        }
      })
      .catch((error) => {
        console.error('Login error:', error);
      });
  }
}
