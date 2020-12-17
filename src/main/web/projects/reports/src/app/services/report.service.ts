import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { ReportType } from '../models/report-type';
import { AppConfig } from '../../../../../src/app/common/service/app.config';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { mockMpt } from '../models/mock-mpt';

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
    const url = this.constant.get('customer-web-endpoint') + '/eni/fetchReport/allSaversReports';
    return this.http.get(url).pipe(catchError(this.handleError.bind(this)));
  }

  fetchMemberEngagementReport(): Observable<any> {
    const url = this.constant.get('customer-web-endpoint') + '/eni/fetchReport/memberEngagementReports';
    return this.http.get(url).pipe(catchError(this.handleError.bind(this)));
  }

  fetchOnboardingDashboard(): Observable<any> {
    const url = this.constant.get('customer-web-endpoint') + '/eni/fetchReport/onboardingDashboard';
    return this.http.get(url).pipe(catchError(this.handleError.bind(this)));
  }

  fetchOrderDetails(startDate: string, endDate: string): Observable<any> {
    const url = this.constant.get('customer-web-endpoint') + '/eni/fetchReport/orderDetails';
    const params = new HttpParams().set('startDate', startDate).set('endDate', endDate);
    return this.http.get(url, {
      params
    }).pipe(catchError(this.handleError.bind(this)));
  }

  fetchLineItemDetails(startDate: string, endDate: string): Observable<any> {
    const url = this.constant.get('customer-web-endpoint') + '/eni/fetchReport/lineItemDetails';
    const params = new HttpParams().set('startDate', startDate).set('endDate', endDate);
    return this.http.get(url, {
      params
    }).pipe(catchError(this.handleError.bind(this)));
  }

  fetchShipmentOrders(): Observable<any> {
    const url = this.constant.get('customer-web-endpoint') + '/eni/fetchReport/shipmentOrders';
    return this.http.get(url).pipe(catchError(this.handleError.bind(this)));
  }

  fetchOeVpReport(): Observable<any> {
    const url = this.constant.get('customer-web-endpoint') + '/eni/fetchReport/OE_VP_DATA_REPORT';
    return this.http.get(url).pipe(catchError(this.handleError.bind(this)));
  }

  fetchInvoiceOrderReport(startDate: string, endDate: string): Observable<any[]> {
    const url = this.constant.get('customer-web-endpoint') + '/eni/fetchReport/invoicingReports/shippedOrderDetails';
    const params = new HttpParams().set('startDate', startDate).set('endDate', endDate);
    return this.http.get<any[]>(url, {
      params
    }).pipe(catchError(this.handleError.bind(this)));
  }

  fetchInvoiceLineItemReport(startDate: string, endDate: string): Observable<any[]> {
    const url = this.constant.get('customer-web-endpoint') + '/eni/fetchReport/invoicingReports/shippedLineItemDetails';
    const params = new HttpParams().set('startDate', startDate).set('endDate', endDate);
    return this.http.get<any[]>(url, {
      params
    }).pipe(catchError(this.handleError.bind(this)));
  }

  fetchInvoiceOrderTypeReport(startDate: string, endDate: string): Observable<any[]> {
    const url = this.constant.get('customer-web-endpoint') + '/eni/fetchReport/invoicingReports/orderDetails';
    const params = new HttpParams().set('startDate', startDate).set('endDate', endDate);
    return this.http.get<any[]>(url, {
      params
    }).pipe(catchError(this.handleError.bind(this)));
  }

  fetchInvoiceLineItemTypeReport(startDate: string, endDate: string): Observable<any[]> {
    const url = this.constant.get('customer-web-endpoint') + '/eni/fetchReport/invoicingReports/lineItemDetails';
    const params = new HttpParams().set('startDate', startDate).set('endDate', endDate);
    return this.http.get<any[]>(url, {
      params
    }).pipe(catchError(this.handleError.bind(this)));
  }

  fetchItemCountInKit(startDate: string, endDate: string): Observable<any[]> {
    const url = this.constant.get('customer-web-endpoint') + '/eni/fetchReport/invoicingReports/itemCountKit';
    const params = new HttpParams().set('startDate', startDate).set('endDate', endDate);
    return this.http.get<any[]>(url, {
      params
    }).pipe(catchError(this.handleError.bind(this)));
  }

  fetchPricingErrorReport(): Observable<any[]> {
    const url = this.constant.get('customer-web-endpoint') + '/eni/fetchReport/invoicingReports/pricingError';
    return this.http.get<any[]>(url).pipe(catchError(this.handleError.bind(this)));
  }

  fetchMissingSkus(): Observable<any[]> {
    const url = this.constant.get('customer-web-endpoint') + '/eni/fetchReport/invoicingReports/missingSku';
    return this.http.get<any[]>(url).pipe(catchError(this.handleError.bind(this)));
  }

  fetchMptReport(): Observable<any> {
    const url = this.constant.get('customer-web-endpoint') + '/eni/fetchReport/mptReportData';
    return this.http.get(url).pipe(catchError(this.handleError.bind(this)));
  }

  fetchMptReportV2(startDate: string, endDate: string): Observable<any[]> {
    const url = this.constant.get('customer-web-endpoint') + '/eni/fetchReport/mptReports';
    const params = new HttpParams().set('startDate', startDate).set('endDate', endDate);
    return this.http.get<any[]>(url, {
      params
    }).pipe(catchError(this.handleError.bind(this)));
  }

  fetchFormFactorTotals(startDate: string, endDate: string): Observable<any[]> {
    const url = this.constant.get('customer-web-endpoint') + '/eni/fetchReport/invoicingReports/formFactorTotals';
    const params = new HttpParams().set('startDate', startDate).set('endDate', endDate);
    return this.http.get<any[]>(url, {
      params
    }).pipe(catchError(this.handleError.bind(this)));
  }

  fetchSkuInformation(startDate: string, endDate: string): Observable<any[]> {
    const url = this.constant.get('customer-web-endpoint') + '/eni/fetchReport/invoicingReports/skuInformation';
    const params = new HttpParams().set('startDate', startDate).set('endDate', endDate);
    return this.http.get<any[]>(url, {
      params
    }).pipe(catchError(this.handleError.bind(this)));
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
