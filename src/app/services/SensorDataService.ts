import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { FilteredLogsData } from '../_shared/models/filterlogs.model';

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
}
