import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppConfig {
  private config: any;
  constructor(private httpClient: HttpClient,
    @Inject('APPNAME') private appName: string
    // private authService: AuthService
  ) {
  }

  public get(key: any) {
    return this.config[key];
  }

  load(configUrl: string): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.get<any>(configUrl + this.appName).toPromise().then(config => {
        this.config = config;
        // BaseService.baseUrl = this.config["customer-base-endpoint"];
        // BaseService.webUrl = this.config["customer-web-endpoint"];
        // Product APIs can be triggered only after login
        // this.authService.tokenInfo().then(user => {
        // this.config['user']= user;
        resolve(config);
        // }).catch(err => {
        // resolve(config);
        // });
      })
    }).catch(e => {
      console.error('error' + e);
      throw e;
    });
  }
}