import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ReportType } from '../models/report-type';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor() { }

  getReportTypes(): Observable<ReportType[]> {
    const types: ReportType[] = [{
      id: 'pie',
      name: 'Report 1'
    }, {
      id: 'column',
      name: 'Report 2'
    }];
    return of(types);
  }
}
