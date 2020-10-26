import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModules, CommonProviders } from '../../../../src/app/common/constants/common';
import { ReportHeaderComponent } from './components/report-header/report-header.component';
import { HomeComponent } from './components/home/home.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ErrorComponent } from './components/error/error.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PopActiveProductsComponent } from './reports/pop-active-products/pop-active-products.component';
import { AllSaversReportComponent } from './reports/all-savers-report/all-savers-report.component';
import { TitleComponent } from './components/title/title.component';
import { DatatablePdfComponent } from './components/datatable-pdf/datatable-pdf.component';
import { OrderStatusReportComponent } from './reports/order-status-report/order-status-report.component';
import { DateRangeComponent } from './components/date-range/date-range.component';
import { MonthlyVolumeReportComponent } from './reports/monthly-volume-report/monthly-volume-report.component';
import { StatusAlertReportComponent } from './reports/status-alert-report/status-alert-report.component';
import { CommonDatePipe } from './pipes/common-date.pipe';
import { MemberEngagementDashboardComponent } from './reports/member-engagement-dashboard/member-engagement-dashboard.component';
import { StandardBrochuresComponent } from './reports/standard-brochures/standard-brochures.component';
import { OrderDetailsLineItemLevelComponent } from './reports/order-details-line-item-level/order-details-line-item-level.component';
import { OrderDetailsOrderLevelComponent } from './reports/order-details-order-level/order-details-order-level.component';
import { QtyPipe } from './pipes/qty.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ReportHeaderComponent,
    HomeComponent,
    ContactUsComponent,
    ErrorComponent,
    DataTableComponent,
    PaginationComponent,
    PopActiveProductsComponent,
    AllSaversReportComponent,
    TitleComponent,
    DatatablePdfComponent,
    OrderStatusReportComponent,
    DateRangeComponent,
    MonthlyVolumeReportComponent,
    StatusAlertReportComponent,
    CommonDatePipe,
    QtyPipe,
    MemberEngagementDashboardComponent,
    StandardBrochuresComponent,
    OrderDetailsLineItemLevelComponent,
    OrderDetailsOrderLevelComponent
  ],
  imports: [
    BrowserModule,
    CommonModules,
    NgxDatatableModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: 'APPNAME', useValue: 'reports' },
    CommonProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
