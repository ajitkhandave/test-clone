import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/components/header/header.component';
import { FooterComponent } from './common/components/footer/footer.component';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { ErrorComponent } from './common/components/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    NgbPopoverModule,
    AppRoutingModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppParentModule { }
