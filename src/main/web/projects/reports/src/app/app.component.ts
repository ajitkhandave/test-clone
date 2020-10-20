import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
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
    private service: ReportService,
    private router: Router
  ) { }

  ngOnInit() {
    const types: ReportType[] = [{
      id: 'all-savers-report',
      name: 'All savers report',
      reportImg: '/reports/assets/images/Resources_Accent@2x.png'
    }, {
      id: 'status-alert-report',
      name: 'Status Alert Report',
      reportImg: '/reports/assets/images/report2.png'
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
      submenu: [{
        id: 'line-item-level',
        name: 'Line Item Level',
        reportImg: '/reports/assets/images/report3.png'
      }, {
        id: 'order-level',
        name: 'Order Level',
        reportImg: '/reports/assets/images/report2.png'
      }],
      disabled: true
    }, {
      id: 'onboarding-dashboard',
      name: 'Onboarding Dashboard',
      reportImg: '/reports/assets/images/report3.png',
      submenu: [{
        id: 'wcbs',
        name: 'WCBs',
        reportImg: '/reports/assets/images/report1.png',
        disabled: true
      }, {
        id: 'standard-brochures',
        name: 'Standard Brochures',
        reportImg: '/reports/assets/images/report2.png'
      }]
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
      id: 'member-engagement-dashboard',
      name: 'Member Engagement Report',
      reportImg: '/reports/assets/images/Resources_Accent@2x.png'
    }, {
      id: 'invoicing-report',
      name: 'Invoicing Report',
      reportImg: '/reports/assets/images/report1.png',
      disabled: true
    }];
    this.service.setReportTypes(types);

    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((resp: NavigationEnd) => {
      let activeReport = null;
      types.some(report => {
        let reportFound = false;
        if (resp.urlAfterRedirects.includes(report.id)) {
          activeReport = report;
          reportFound = true;
        }
        if (!reportFound && report.submenu && report.submenu.length) {
          const innerReport = report.submenu.find(subReport => resp.urlAfterRedirects.includes(subReport.id));
          if (innerReport) {
            activeReport = innerReport;
            reportFound = true;
          }
        }
        return reportFound;
      });
      this.service.activeReport = activeReport;
    });
  }
}
