import { Component, OnInit } from '@angular/core';
import { ReportType } from './models/report-type';
import { ReportService } from './services/report.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'reports';
  constructor(
    private service: ReportService
  ) { }

  ngOnInit() {
    const types: ReportType[] = [{
      id: 'all-savers-report',
      name: 'All savers report'
    }, {
      id: 'type/status-alert-report',
      name: 'Status Alert Report'
    }, {
      id: 'pop-active-products',
      name: 'POP Active Products Report'
    }, {
      id: 'type/order-status',
      name: 'Order Status Report'
    }, {
      id: 'type/order-details',
      name: 'Order Details Report'
    }, {
      id: 'type/onboarding-dashboard',
      name: 'Onboarding Dashboard'
    }, {
      id: 'type/oe-vp-data',
      name: 'OE VP Data Report'
    }, {
      id: 'type/eni-monthly-volume',
      name: 'ENI Monthly Volume Report'
    }, {
      id: 'type/member-engagement',
      name: 'Member Engagement Report'
    }, {
      id: 'type/invoicing-report',
      name: 'Invoicing Report'
    }];
    this.service.setReportTypes(types);
  }
}
