import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { ReportType } from '../models/report-type';
import { AppConfig } from '../../../../../src/app/common/service/app.config';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  reportTypes: ReportType[];
  _activeReport: ReportType;

  public exportAsPdf$: Subject<boolean> = new Subject();
  public exportAsExcel$: Subject<void> = new Subject();

  constructor(
    private http: HttpClient,
    private constant: AppConfig
  ) { }


  get activeReport(): ReportType {
    return this._activeReport;
  }

  set activeReport(report: ReportType) {
    this._activeReport = report;
  }

  getReportTypes(): Observable<ReportType[]> {
    return of(this.reportTypes);
  }

  getReport(reportId: string): ReportType {
    return this.reportTypes.find(report => report.id === reportId);
  }

  setReportTypes(types: ReportType[]): void {
    this.reportTypes = types;
  }

  fetchPopActiveReports(): Observable<any> {
    const url = this.constant.get('customer-web-endpoint') + '/eni/fetchReport/POP_ACTIVE_PRODUCTS';
    return this.http.get<any>(url);
  }

  fetchOrderStatusReports(): Observable<any> {
    const url = this.constant.get('customer-web-endpoint') + '/eni/fetchReport/ORDER_STATUS_REPORT';
    return this.http.get<any>(url);
  }

  fetchMonthlyVolume(): Observable<any> {
    const url = this.constant.get('customer-web-endpoint') + '/eni/fetchReport/MONTHLY_VOLUME_REPORT';
    return this.http.get(url);
  }
}
