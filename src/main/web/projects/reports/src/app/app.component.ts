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
      id: 'status-alert-report',
      name: 'Status Alert Report'
    }, {
      id: 'pop-active-products',
      name: 'POP Active Products Report'
    }, {
      id: 'order-status',
      name: 'Order Status Report'
    }, {
      id: 'order-details',
      name: 'Order Details Report'
    }, {
      id: 'onboarding-dashboard',
      name: 'Onboarding Dashboard'
    }, {
      id: 'oe-vp-data',
      name: 'OE VP Data Report'
    }, {
      id: 'eni-monthly-volume',
      name: 'ENI Monthly Volume Report'
    }, {
      id: 'member-engagement',
      name: 'Member Engagement Report'
    }, {
      id: 'invoicing-report',
      name: 'Invoicing Report'
    }];
    this.service.setReportTypes(types);
  }
}
