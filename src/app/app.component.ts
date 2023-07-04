import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public afAuth: AngularFireAuth, private router: Router) {}

  title = 'my-app';

  async logout() {
    try {
      await this.afAuth.signOut();
      console.log('You have been logged out');
      this.router.navigate(['login']); // Navigate to the login page after logout
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
}
