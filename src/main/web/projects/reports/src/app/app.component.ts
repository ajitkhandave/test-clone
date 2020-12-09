import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '@sbs/ngpc-auth';
import { filter } from 'rxjs/operators';
import { ReportType } from './models/report-type';
import { AccessRole } from './services/access.role';
import { ReportEnum } from './services/report.constant';
import { ReportService } from './services/report.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private service: ReportService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    const token = this.authService.decodeToken();
    const authorities = (token && token.authorities) || [];
    const types: ReportType[] = [{
      id: ReportEnum.AllSaversReport,
      name: 'All Savers Report',
      reportImg: '/reports/assets/images/Reporting_Accent1@2x.png'
    }, {
      id: ReportEnum.StatusAlertReport,
      name: 'Status Alerts Report',
      reportImg: '/reports/assets/images/Reporting_Accent2@2x.png'
    }, {
      id: ReportEnum.PopActiveProducts,
      name: 'POP Active Products Report',
      reportImg: '/reports/assets/images/Reporting_Accent3@2x.png'
    }, {
      id: ReportEnum.OrderStatusReport,
      name: 'Order Status Report',
      reportImg: '/reports/assets/images/Reporting_Accent4@2x.png'
    }, {
      id: ReportEnum.OrderDetailsReport,
      name: 'Order Details Report',
      reportImg: '/reports/assets/images/Reporting_Accent4@2x.png',
      submenu: [{
        id: ReportEnum.OrderDetailsLineItemReport,
        name: 'Order Details - Line Item Level',
        reportImg: '/reports/assets/images/Reporting_Accent3@2x.png'
      }, {
        id: ReportEnum.OrderDetailsOrderReport,
        name: 'Order Details - Order Level',
        reportImg: '/reports/assets/images/Reporting_Accent1@2x.png'
      }]
    }, {
      id: ReportEnum.OnboardingDashboardReport,
      name: 'Onboarding Dashboard',
      reportImg: '/reports/assets/images/Reporting_Accent3@2x.png',
      submenu: [{
        id: ReportEnum.WcbsReport,
        name: 'Onboarding Dashboard - WCBs',
        reportImg: '/reports/assets/images/Reporting_Accent1@2x.png'
      }, {
        id: ReportEnum.StandardBrochuresReport,
        name: 'Onboarding Dashboard - Standard Brochures',
        reportImg: '/reports/assets/images/Reporting_Accent2@2x.png'
      }]
    }, {
      id: ReportEnum.OeVpReport,
      name: 'Open Enrollment VP Data Report',
      reportImg: '/reports/assets/images/Reporting_Accent2@2x.png'
    }, {
      id: ReportEnum.MonthlyVolumeReport,
      name: 'Monthly Volume Report',
      reportImg: '/reports/assets/images/Reporting_Accent1@2x.png'
    }, {
      id: ReportEnum.MemberEngagementDashboardReport,
      name: 'Member Engagement Dashboard',
      reportImg: '/reports/assets/images/Reporting_Accent1@2x.png'
    }, {
      id: ReportEnum.InvoicingReport,
      name: 'Invoicing Report',
      reportImg: '/reports/assets/images/Reporting_Accent2@2x.png',
      submenu: [{
        reportImg: '/reports/assets/images/Reporting_Accent2@2x.png',
        id: ReportEnum.InvoicingOrderReportLineItemLevel,
        name: 'Order Report - Line Item Level'
      }, {
        reportImg: '/reports/assets/images/Reporting_Accent3@2x.png',
        id: ReportEnum.InvoicingOrderReportOrderLevel,
        name: 'Order Report - Order Level'
      }, {
        reportImg: '/reports/assets/images/Reporting_Accent4@2x.png',
        id: ReportEnum.InvoicingInvoiceReportLineItemLevel,
        name: 'Invoice Report - Line Item Level'
      }, {
        reportImg: '/reports/assets/images/Reporting_Accent1@2x.png',
        id: ReportEnum.InvoicingInvoiceReportOrderLevel,
        name: 'Invoice Report - Order Level'
      }, {
        reportImg: '/reports/assets/images/Reporting_Accent3@2x.png',
        id: ReportEnum.InvoicingItemCountInKitReport,
        name: 'Item Count In Kit'
      }, {
        reportImg: '/reports/assets/images/Reporting_Accent1@2x.png',
        id: ReportEnum.InvoicingSkuInformationReport,
        name: 'SKU Information'
      }, {
        reportImg: '/reports/assets/images/Reporting_Accent2@2x.png',
        id: ReportEnum.InvoicingSkusToAddReport,
        name: 'SKUs to Add'
      }, {
        reportImg: '/reports/assets/images/Reporting_Accent4@2x.png',
        id: ReportEnum.InvoicingPricingErrorReport,
        name: 'Pricing Error'
      }]
    }, {
      id: ReportEnum.ShipmentsOrderReport,
      name: 'Shipments by Order',
      reportImg: '/reports/assets/images/Reporting_Accent3@2x.png'
    }, {
      id: ReportEnum.MptReport,
      name: 'MPT Report',
      reportImg: '/reports/assets/images/Reporting_Accent4@2x.png'
    }, {
      id: ReportEnum.OeReport,
      name: 'OE Report',
      reportImg: '/reports/assets/images/Reporting_Accent3@2x.png',
      disabled: true
    }].filter(report => AccessRole.isAllowed(authorities, report.id));
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
