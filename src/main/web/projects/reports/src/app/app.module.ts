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

@NgModule({
  declarations: [
    AppComponent,
    ReportHeaderComponent,
    HomeComponent,
    ContactUsComponent,
    ErrorComponent,
    DataTableComponent,
    PaginationComponent,
    PopActiveProductsComponent
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
