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
      id: 'type/status-alert-report',
      name: 'Status Alert Report',
      reportImg: '/reports/assets/images/report2.png'
    }, {
      id: 'pop-active-products',
      name: 'POP Active Products Report',
      reportImg: '/reports/assets/images/report1.png'
    }, {
      id: 'type/order-status',
      name: 'Order Status Report',
      reportImg: '/reports/assets/images/report3.png'
    }, {
      id: 'type/order-details',
      name: 'Order Details Report',
      reportImg: '/reports/assets/images/report1.png'
    }, {
      id: 'type/onboarding-dashboard',
      name: 'Onboarding Dashboard',
      reportImg: '/reports/assets/images/report3.png'
    }, {
      id: 'type/oe-vp-data',
      name: 'OE VP Data Report',
      reportImg: '/reports/assets/images/report2.png'
    }, {
      id: 'type/eni-monthly-volume',
      name: 'ENI Monthly Volume Report',
      reportImg: '/reports/assets/images/Resources_Accent@2x.png'
    }, {
      id: 'type/member-engagement',
      name: 'Member Engagement Report',
      reportImg: '/reports/assets/images/Resources_Accent@2x.png'
    }, {
      id: 'type/invoicing-report',
      name: 'Invoicing Report',
      reportImg: '/reports/assets/images/report1.png'
    }];
    this.service.setReportTypes(types);
  }
}
