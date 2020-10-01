import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ReportType } from '../models/report-type';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  reportTypes: ReportType[];

  constructor() { }

  getReportTypes(): Observable<ReportType[]> {
    return of(this.reportTypes);
  }

  getReprot(reportId: string): ReportType {
    return this.reportTypes.find(report => report.id === reportId);
  }

  setReportTypes(types: ReportType[]): void {
    this.reportTypes = types;
  }
}
