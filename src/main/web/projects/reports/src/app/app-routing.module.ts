import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { TitleComponent } from './components/title/title.component';
import { AllSaversReportComponent } from './reports/all-savers-report/all-savers-report.component';
import { MemberEngagementDashboardComponent } from './reports/member-engagement-dashboard/member-engagement-dashboard.component';
import { MonthlyVolumeReportComponent } from './reports/monthly-volume-report/monthly-volume-report.component';
import { OrderDetailsLineItemLevelComponent } from './reports/order-details-line-item-level/order-details-line-item-level.component';
import { OrderDetailsOrderLevelComponent } from './reports/order-details-order-level/order-details-order-level.component';
import { OrderStatusReportComponent } from './reports/order-status-report/order-status-report.component';
import { PopActiveProductsComponent } from './reports/pop-active-products/pop-active-products.component';
import { ShipmentOrdersComponent } from './reports/shipment-orders/shipment-orders.component';
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
        }
        ]
      },
      {
        path: 'contact',
        component: ContactUsComponent
      },
      {
        path: 'error',
        component: ErrorComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
