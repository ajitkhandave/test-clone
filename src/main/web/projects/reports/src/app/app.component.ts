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
      name: 'All Savers Report',
      reportImg: '/reports/assets/images/Reporting_Accent1@2x.png'
    }, {
      id: 'status-alert-report',
      name: 'Status Alerts Report',
      reportImg: '/reports/assets/images/Reporting_Accent2@2x.png'
    }, {
      id: 'pop-active-products',
      name: 'POP Active Products Report',
      reportImg: '/reports/assets/images/Reporting_Accent3@2x.png'
    }, {
      id: 'order-status-report',
      name: 'Order Status Report',
      reportImg: '/reports/assets/images/Reporting_Accent4@2x.png'
    }, {
      id: 'order-details',
      name: 'Order Details Report',
      reportImg: '/reports/assets/images/Reporting_Accent4@2x.png',
      submenu: [{
        id: 'line-item-level-report',
        name: 'Order Details - Line Item Level',
        reportImg: '/reports/assets/images/Reporting_Accent3@2x.png'
      }, {
        id: 'order-level-report',
        name: 'Order Details - Order Level',
        reportImg: '/reports/assets/images/Reporting_Accent1@2x.png'
      }]
    }, {
      id: 'onboarding-dashboard',
      name: 'Onboarding Dashboard',
      reportImg: '/reports/assets/images/Reporting_Accent3@2x.png',
      submenu: [{
        id: 'wcbs',
        name: 'Onboarding Dashboard - WCBs',
        reportImg: '/reports/assets/images/Reporting_Accent1@2x.png'
      }, {
        id: 'standard-brochures',
        name: 'Onboarding Dashboard - Standard Brochures',
        reportImg: '/reports/assets/images/Reporting_Accent2@2x.png'
      }]
    }, {
      id: 'oe-vp-report',
      name: 'Open Enrollment VP Data Report',
      reportImg: '/reports/assets/images/Reporting_Accent2@2x.png'
    }, {
      id: 'monthly-volume-report',
      name: 'Monthly Volume Report',
      reportImg: '/reports/assets/images/Reporting_Accent1@2x.png'
    }, {
      id: 'member-engagement-dashboard',
      name: 'Member Engagement Dashboard',
      reportImg: '/reports/assets/images/Reporting_Accent1@2x.png'
    }, {
      id: 'invoicing-report',
      name: 'Invoicing Report',
      reportImg: '/reports/assets/images/Reporting_Accent2@2x.png',
      submenu: [{
        reportImg: '/reports/assets/images/Reporting_Accent2@2x.png',
        id: 'order-report-line-item-level',
        name: 'Order Report - Line Item Level'
      }, {
        reportImg: '/reports/assets/images/Reporting_Accent3@2x.png',
        id: 'order-report-order-level',
        name: 'Order Report - Order Level'
      }, {
        reportImg: '/reports/assets/images/Reporting_Accent4@2x.png',
        id: 'shipping-report-line-item-level',
        name: 'Invoice Report - Line Item Level'
      }, {
        reportImg: '/reports/assets/images/Reporting_Accent1@2x.png',
        id: 'shipping-report-order-level',
        name: 'Invoice Report - Order Level'
      }, {
        reportImg: '/reports/assets/images/Reporting_Accent3@2x.png',
        id: 'item-count-in-kit',
        name: 'Item Count In Kit'
      }, {
        reportImg: '/reports/assets/images/Reporting_Accent1@2x.png',
        id: 'sku-information',
        name: 'SKU Information',
        disabled: true
      }, {
        reportImg: '/reports/assets/images/Reporting_Accent2@2x.png',
        id: 'skus-to-add',
        name: 'SKUs to Add',
        disabled: true
      }, {
        reportImg: '/reports/assets/images/Reporting_Accent4@2x.png',
        id: 'pricing-error',
        name: 'Pricing Error'
      }]
    }, {
      id: 'shipments-order',
      name: 'Shipments by Order',
      reportImg: '/reports/assets/images/Reporting_Accent3@2x.png'
    }, {
      id: 'mpt-report',
      name: 'MPT Report',
      reportImg: '/reports/assets/images/Reporting_Accent4@2x.png'
    }, {
      id: 'oe-report',
      name: 'OE Report',
      reportImg: '/reports/assets/images/Reporting_Accent3@2x.png',
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
