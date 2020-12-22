import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { HomeComponent } from './components/home/home.component';
import { TitleComponent } from './components/title/title.component';
import { AllSaversReportV2Component } from './reports/all-savers-report-v2/all-savers-report-v2.component';
import { AllSaversReportComponent } from './reports/all-savers-report/all-savers-report.component';
import { InvoiceReportItemCountComponent } from './reports/invoice-report-item-count/invoice-report-item-count.component';
import { InvoiceReportLineItemLevelComponent } from './reports/invoice-report-line-item-level/invoice-report-line-item-level.component';
import { MemberEngagementDashboardComponent } from './reports/member-engagement-dashboard/member-engagement-dashboard.component';
import { MonthlyVolumeReportComponent } from './reports/monthly-volume-report/monthly-volume-report.component';
import { MptReportV2Component } from './reports/mpt-report-v2/mpt-report-v2.component';
import { MptReportComponent } from './reports/mpt-report/mpt-report.component';
import { OeVpReportComponent } from './reports/oe-vp-report/oe-vp-report.component';
import { OrderDetailsLineItemLevelComponent } from './reports/order-details-line-item-level/order-details-line-item-level.component';
import { OrderDetailsOrderLevelComponent } from './reports/order-details-order-level/order-details-order-level.component';
import { OrderReportLineItemLevelComponent } from './reports/order-report-line-item-level/order-report-line-item-level.component';
import { OrderReportOrderLevelComponent } from './reports/order-report-order-level/order-report-order-level.component';
import { OrderStatusReportComponent } from './reports/order-status-report/order-status-report.component';
import { PopActiveProductsComponent } from './reports/pop-active-products/pop-active-products.component';
import { PricingErrorComponent } from './reports/pricing-error/pricing-error.component';
import { ShipmentOrdersComponent } from './reports/shipment-orders/shipment-orders.component';
import { ShippingReportOrderLevelComponent } from './reports/shipping-report-order-level/shipping-report-order-level.component';
import { SkuInformationComponent } from './reports/sku-information/sku-information.component';
import { SkusToAddComponent } from './reports/skus-to-add/skus-to-add.component';
import { StandardBrochuresComponent } from './reports/standard-brochures/standard-brochures.component';
import { StatusAlertReportComponent } from './reports/status-alert-report/status-alert-report.component';
import { WcbsComponent } from './reports/wcbs/wcbs.component';
import { ReportEnum } from './services/report.constant';
import { RoleGuard } from './services/role.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'reports'
  }, {
    path: 'reports',
    children: [
      {
        path: '',
        pathMatch: 'full',
        canActivate: [RoleGuard],
        component: HomeComponent
      },
      {
        path: 'type',
        component: TitleComponent,
        children: [{
          path: ReportEnum.PopActiveProducts,
          canActivate: [RoleGuard],
          component: PopActiveProductsComponent
        }, {
          path: ReportEnum.AllSaversReport,
          canActivate: [RoleGuard],
          component: AllSaversReportComponent
        }, {
          path: ReportEnum.AllSaversReportV2,
          canActivate: [RoleGuard],
          component: AllSaversReportV2Component
        },{
          path: ReportEnum.OrderStatusReport,
          canActivate: [RoleGuard],
          component: OrderStatusReportComponent
        }, {
          path: ReportEnum.MonthlyVolumeReport,
          canActivate: [RoleGuard],
          component: MonthlyVolumeReportComponent
        }, {
          path: ReportEnum.StatusAlertReport,
          canActivate: [RoleGuard],
          component: StatusAlertReportComponent
        }, {
          path: ReportEnum.MemberEngagementDashboardReport,
          canActivate: [RoleGuard],
          component: MemberEngagementDashboardComponent
        }, {
          path: ReportEnum.StandardBrochuresReport,
          canActivate: [RoleGuard],
          component: StandardBrochuresComponent
        }, {
          path: ReportEnum.OrderDetailsLineItemReport,
          canActivate: [RoleGuard],
          component: OrderDetailsLineItemLevelComponent
        }, {
          path: ReportEnum.OrderDetailsOrderReport,
          canActivate: [RoleGuard],
          component: OrderDetailsOrderLevelComponent
        }, {
          path: ReportEnum.ShipmentsOrderReport,
          canActivate: [RoleGuard],
          component: ShipmentOrdersComponent
        }, {
          path: ReportEnum.WcbsReport,
          canActivate: [RoleGuard],
          component: WcbsComponent
        }, {
          path: ReportEnum.OeVpReport,
          canActivate: [RoleGuard],
          component: OeVpReportComponent
        }, {
          path: ReportEnum.InvoicingInvoiceReportOrderLevel,
          canActivate: [RoleGuard],
          component: ShippingReportOrderLevelComponent
        }, {
          path: ReportEnum.InvoicingInvoiceReportLineItemLevel,
          canActivate: [RoleGuard],
          component: InvoiceReportLineItemLevelComponent
        }, {
          path: ReportEnum.InvoicingOrderReportOrderLevel,
          canActivate: [RoleGuard],
          component: OrderReportOrderLevelComponent
        }, {
          path: ReportEnum.InvoicingOrderReportLineItemLevel,
          canActivate: [RoleGuard],
          component: OrderReportLineItemLevelComponent
        }, {
          path: ReportEnum.InvoicingItemCountInKitReport,
          canActivate: [RoleGuard],
          component: InvoiceReportItemCountComponent
        }, {
          path: ReportEnum.MptReportOld,
          canActivate: [RoleGuard],
          component: MptReportComponent
        }, {
          path: ReportEnum.MptReport,
          canActivate: [RoleGuard],
          component: MptReportV2Component
        }, {
          path: ReportEnum.InvoicingPricingErrorReport,
          canActivate: [RoleGuard],
          component: PricingErrorComponent
        }, {
          path: ReportEnum.InvoicingSkusToAddReport,
          canActivate: [RoleGuard],
          component: SkusToAddComponent
        }, {
          path: ReportEnum.InvoicingSkuInformationReport,
          canActivate: [RoleGuard],
          component: SkuInformationComponent
        }
        ]
      },
      {
        path: 'contact',
        component: ContactUsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
