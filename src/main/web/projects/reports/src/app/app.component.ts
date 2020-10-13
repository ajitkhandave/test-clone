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
      name: 'All savers report',
      reportImg: '/reports/assets/images/Resources_Accent@2x.png'
    }, {
      id: 'status-alert-report',
      name: 'Status Alert Report',
      reportImg: '/reports/assets/images/report2.png',
      disabled: true
    }, {
      id: 'pop-active-products',
      name: 'POP Active Products Report',
      reportImg: '/reports/assets/images/report1.png'
    }, {
      id: 'order-status-report',
      name: 'Order Status Report',
      reportImg: '/reports/assets/images/report3.png'
    }, {
      id: 'order-details',
      name: 'Order Details Report',
      reportImg: '/reports/assets/images/report1.png',
      disabled: true
    }, {
      id: 'onboarding-dashboard',
      name: 'Onboarding Dashboard',
      reportImg: '/reports/assets/images/report3.png',
      disabled: true
    }, {
      id: 'oe-vp-data',
      name: 'OE VP Data Report',
      reportImg: '/reports/assets/images/report2.png',
      disabled: true
    }, {
      id: 'monthly-volume-report',
      name: 'ENI Monthly Volume Report',
      reportImg: '/reports/assets/images/Resources_Accent@2x.png'
    }, {
      id: 'member-engagement',
      name: 'Member Engagement Report',
      reportImg: '/reports/assets/images/Resources_Accent@2x.png',
      disabled: true
    }, {
      id: 'invoicing-report',
      name: 'Invoicing Report',
      reportImg: '/reports/assets/images/report1.png',
      disabled: true
    }];
    this.service.setReportTypes(types);
  }
}
