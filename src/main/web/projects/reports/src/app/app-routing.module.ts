import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { HomeComponent } from './components/home/home.component';
import { TitleComponent } from './components/title/title.component';
import { AllSaversReportComponent } from './reports/all-savers-report/all-savers-report.component';
import { InvoiceReportItemCountComponent } from './reports/invoice-report-item-count/invoice-report-item-count.component';
import { InvoiceReportLineItemLevelComponent } from './reports/invoice-report-line-item-level/invoice-report-line-item-level.component';
import { MemberEngagementDashboardComponent } from './reports/member-engagement-dashboard/member-engagement-dashboard.component';
import { MonthlyVolumeReportComponent } from './reports/monthly-volume-report/monthly-volume-report.component';
import { MptReportComponent } from './reports/mpt-report/mpt-report.component';
import { OeVpReportComponent } from './reports/oe-vp-report/oe-vp-report.component';
import { OrderDetailsLineItemLevelComponent } from './reports/order-details-line-item-level/order-details-line-item-level.component';
import { OrderDetailsOrderLevelComponent } from './reports/order-details-order-level/order-details-order-level.component';
import { OrderReportLineItemLevelComponent } from './reports/order-report-line-item-level/order-report-line-item-level.component';
import { OrderReportOrderLevelComponent } from './reports/order-report-order-level/order-report-order-level.component';
import { OrderStatusReportComponent } from './reports/order-status-report/order-status-report.component';
import { PopActiveProductsComponent } from './reports/pop-active-products/pop-active-products.component';
import { ShipmentOrdersComponent } from './reports/shipment-orders/shipment-orders.component';
import { ShippingReportOrderLevelComponent } from './reports/shipping-report-order-level/shipping-report-order-level.component';
import { StandardBrochuresComponent } from './reports/standard-brochures/standard-brochures.component';
import { StatusAlertReportComponent } from './reports/status-alert-report/status-alert-report.component';
import { WcbsComponent } from './reports/wcbs/wcbs.component';

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
        component: HomeComponent
      },
      {
        path: 'type',
        component: TitleComponent,
        children: [{
          path: 'pop-active-products',
          component: PopActiveProductsComponent
        }, {
          path: 'all-savers-report',
          component: AllSaversReportComponent
        }, {
          path: 'order-status-report',
          component: OrderStatusReportComponent
        }, {
          path: 'monthly-volume-report',
          component: MonthlyVolumeReportComponent
        }, {
          path: 'status-alert-report',
          component: StatusAlertReportComponent
        }, {
          path: 'member-engagement-dashboard',
          component: MemberEngagementDashboardComponent
        }, {
          path: 'standard-brochures',
          component: StandardBrochuresComponent
        }, {
          path: 'line-item-level-report',
          component: OrderDetailsLineItemLevelComponent
        }, {
          path: 'order-level-report',
          component: OrderDetailsOrderLevelComponent
        }, {
          path: 'shipments-order',
          component: ShipmentOrdersComponent
        }, {
          path: 'wcbs',
          component: WcbsComponent
        }, {
          path: 'oe-vp-report',
          component: OeVpReportComponent
        }, {
          path: 'shipping-report-order-level',
          component: ShippingReportOrderLevelComponent
        }, {
          path: 'shipping-report-line-item-level',
          component: InvoiceReportLineItemLevelComponent
        }, {
          path: 'order-report-order-level',
          component: OrderReportOrderLevelComponent
        }, {
          path: 'order-report-line-item-level',
          component: OrderReportLineItemLevelComponent
        }, {
          path: 'item-count-in-kit',
          component: InvoiceReportItemCountComponent
        }, {
          path: 'mpt-report',
          component: MptReportComponent
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
