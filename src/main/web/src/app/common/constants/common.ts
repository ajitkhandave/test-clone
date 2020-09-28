// import {AuthInterceptor, NgpcAuthModule, RefreshTokenInterceptor} from "@sbs/ngpc-auth";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppParentModule} from "../../app.module";
import {ToastrModule} from "ngx-toastr";
import {APP_BASE_HREF, PlatformLocation} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AppConfig} from "../service/app.config";
import {APP_INITIALIZER} from "@angular/core";

export const CommonModules = [
    NgbModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppParentModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
    // LoaderModule,
    // NgpcAuthModule.forRoot({loginUrl: 'auth', appCode: 'eni', baseUrl: 'http://localhost:8080'})
];

export const CommonProviders = [
    {provide: APP_BASE_HREF, useFactory: getBaseHref, deps: [PlatformLocation]},
    // {provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true},
    // {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: APP_INITIALIZER, useFactory: AppConfigFactory, deps: [AppConfig], multi: true},
    AppConfig
];

export function getBaseHref(platformLocation: PlatformLocation): string {
    return platformLocation.getBaseHrefFromDOM();
}

export function AppConfigFactory(config: AppConfig) {
    const serviceUrl = 'http://localhost:8081/public/api/ui-config/';
    return () => config.load(serviceUrl);
}
