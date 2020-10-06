import {AuthInterceptor, NgpcAuthModule, RefreshTokenInterceptor} from "@sbs/ngpc-auth";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {APP_BASE_HREF, PlatformLocation} from "@angular/common";
import {APP_INITIALIZER} from "@angular/core";
import { LoaderInterceptor, LoaderModule } from '@sbs/loader';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ToastrModule} from "ngx-toastr";
import {AppParentModule} from "../../app.module";
import {AppConfig} from "../service/app.config";

export const CommonModules = [
    NgbModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppParentModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    LoaderModule,
    NgpcAuthModule.forRoot({loginUrl: 'reports/error', appCode: 'eni'})
];

export const CommonProviders = [
    {provide: APP_BASE_HREF, useFactory: getBaseHref, deps: [PlatformLocation]},
    {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: APP_INITIALIZER, useFactory: AppConfigFactory, deps: [AppConfig], multi: true},
    AppConfig
];

export function getBaseHref(platformLocation: PlatformLocation): string {
    return platformLocation.getBaseHrefFromDOM();
}

export function AppConfigFactory(config: AppConfig) {
    const serviceUrl = '/public/api/ui-config/';
    return () => config.load(serviceUrl);
}
