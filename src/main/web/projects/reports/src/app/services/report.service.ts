import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ReportType } from '../models/report-type';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  reportTypes: ReportType[];

  constructor(
    private http: HttpClient
  ) { }

  getReportTypes(): Observable<ReportType[]> {
    return of(this.reportTypes);
  }

  getReport(reportId: string): ReportType {
    return this.reportTypes.find(report => report.id === reportId);
  }

  setReportTypes(types: ReportType[]): void {
    this.reportTypes = types;
  }

  fetchOrders(): Observable<any> {
    return this.http.get<any>('/assets/orders.json');
  }
}
