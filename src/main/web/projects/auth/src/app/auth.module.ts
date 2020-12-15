import {APP_INITIALIZER, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {Routes} from './app-routing.module'
import {LoginComponent} from "./components/login/login.component";
import {ResetPasswordComponent} from "./components/resetpassword/reset-password.component";
import {AppConfigFactory, CommonModules, getBaseHref} from "../../../../src/app/common/constants/common";
import {AppConfig} from "../../../../src/app/common/service/app.config";
import {APP_BASE_HREF, PlatformLocation} from "@angular/common";
import { ErrorComponent } from './components/error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResetPasswordComponent,
    ErrorComponent,
  ],
  imports: [
    RouterModule.forRoot(Routes),
    CommonModules
  ],
  providers: [
    {provide: APP_INITIALIZER, useFactory: AppConfigFactory, deps: [AppConfig], multi: true},
    {provide: APP_BASE_HREF, useFactory: getBaseHref, deps: [PlatformLocation]},
    AppConfig,
    {provide: 'APPNAME', useValue: 'auth'},
  ],
  bootstrap: [AppComponent]
})
export class AuthModule {
}
