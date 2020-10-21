import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { ReportType } from '../models/report-type';
import { AppConfig } from '../../../../../src/app/common/service/app.config';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';

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
    private constant: AppConfig,
    private toastrService: ToastrService,
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

  verifyConnection(): Observable<any> {
    return this.http.get(this.constant.get('customer-web-endpoint') + '/eni/validConnection', {
      responseType: 'text'
    });
  }

  getReport(reportId: string): ReportType {
    return this.reportTypes.find(report => report.id === reportId);
  }

  setReportTypes(types: ReportType[]): void {
    this.reportTypes = types;
  }

  fetchPopActiveReports(): Observable<any> {
    const url = this.constant.get('customer-web-endpoint') + '/eni/fetchReport/POP_ACTIVE_PRODUCTS';
    return this.http.get<any>(url).pipe(catchError(this.handleError.bind(this)));;
  }

  fetchOrderStatusReports(): Observable<any> {
    const url = this.constant.get('customer-web-endpoint') + '/eni/fetchReport/ORDER_STATUS_REPORT';
    return this.http.get<any>(url).pipe(catchError(this.handleError.bind(this)));;
  }

  fetchMonthlyVolume(): Observable<any> {
    const url = this.constant.get('customer-web-endpoint') + '/eni/fetchReport/MONTHLY_VOLUME_REPORT';
    return this.http.get(url).pipe(catchError(this.handleError.bind(this)));;
  }

  fetchStatusAlertReport(): Observable<any> {
    const url = this.constant.get('customer-web-endpoint') + '/eni/fetchReport/STATUS_ALERT_REPORT';
    return this.http.get(url).pipe(catchError(this.handleError.bind(this)));;
  }

  fetchAllSaversReport(): Observable<any> {
    const url = this.constant.get('customer-web-endpoint') + '/eni/fetchReport/ALL_SAVERS_REPORT';
    return this.http.get(url).pipe(catchError(this.handleError.bind(this)));
  }

  fetchMemberEngagementReport(): Observable<any> {
    const url = this.constant.get('customer-web-endpoint') + '/eni/fetchReport/MEMBER_ENGAGEMENT_REPORT';
    return this.http.get(url).pipe(catchError(this.handleError.bind(this)));
  }

  fetchStandardBrochure(): Observable<any> {
    const url = this.constant.get('customer-web-endpoint') + '/eni/fetchReport/standardBrochures';
    return this.http.get(url).pipe(catchError(this.handleError.bind(this)));
  }

  handleError(err?): Observable<any> {
    let msg = 'Something went wrong. Please try again.';
    if (err && err.message) {
      msg = err.message;
    }
    this.toastrService.error(msg);
    return of([]);
  }
}
