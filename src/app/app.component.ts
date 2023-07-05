import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { SensorDataService } from './services/SensorDataService';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  unreadNotificationCount$: Observable<number> | undefined;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private sensorDataService: SensorDataService
  ) {}

  title = 'PYRONNOIA';

  ngOnInit(): void {
    this.unreadNotificationCount$ = this.sensorDataService.getUnreadSensorDataCount();
  }

  async logout() {
    try {
      await this.afAuth.signOut();
      console.log('You have been logged out');
      this.router.navigate(['login']);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
}
