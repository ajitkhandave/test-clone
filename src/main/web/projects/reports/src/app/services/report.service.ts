import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ReportType } from '../models/report-type';
import { AppConfig } from '../../../../../src/app/common/service/app.config';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  reportTypes: ReportType[];

  constructor(
    private http: HttpClient,
    private constant: AppConfig
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
    const url = this.constant.get('customer-web-endpoint') + '/eni/fetchReport/POP_ACTIVE_PRODUCTS';
    return this.http.get<any>(url);
  }
}
