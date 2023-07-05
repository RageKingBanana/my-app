import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { SensorDataService } from './services/SensorDataService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private sensorDataService: SensorDataService
  ) {}

  title = 'PYRONNOIA';

  async logout() {
    try {
      await this.afAuth.signOut();
      console.log('You have been logged out');
      this.router.navigate(['login']);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  getUnreadNotificationCount(): number {
    let unreadCount = 0;
    this.sensorDataService.sensorData$.subscribe(sensorDataList => {
      unreadCount = sensorDataList.filter(data => !data.sensorDataValues.statusNotif).length;
    });
    return unreadCount;
  }
}
