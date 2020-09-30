import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModules, CommonProviders } from '../../../../src/app/common/constants/common';
import { ReportHeaderComponent } from './components/report-header/report-header.component';
import { ReportsComponent } from './components/reports/reports.component';
import { HomeComponent } from './components/home/home.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    ReportHeaderComponent,
    ReportsComponent,
    HomeComponent,
    ContactUsComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    CommonModules,
    AppRoutingModule
  ],
  providers: [
    { provide: 'APPNAME', useValue: 'reports' },
    CommonProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
