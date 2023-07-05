import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map, tap } from 'rxjs';
import { FilteredLogsData } from '../logs/logs.component';

@Injectable({
  providedIn: 'root'
})
export class SensorDataService {
  private sensorDataSubject: BehaviorSubject<FilteredLogsData[]> = new BehaviorSubject<FilteredLogsData[]>([]);

  get sensorData$(): Observable<FilteredLogsData[]> {
    return this.sensorDataSubject.asObservable();
  }

  setSensorData(sensorData: FilteredLogsData[]): void {
    this.sensorDataSubject.next(sensorData);
  }

  getUnreadSensorDataCount(): Observable<number> {
    return this.sensorDataSubject.pipe(
      map((sensorData) => sensorData.filter(data => data.isread == 'false').length),
      tap((unreadCount) => console.log('Unread Notification Count:', unreadCount))
    );
  }
}
