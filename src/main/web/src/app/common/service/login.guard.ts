import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '@sbs/ngpc-auth';
import { Observable } from 'rxjs';
import {AppConfig} from "./app.config";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private config: AppConfig
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isUnauthorized = !this.authService.authenticated();
    const authorities = this.authService.decodeToken().authorities;
    const allowedRoles = (this.config.get('access-role') || '').split(',');

    if (!isUnauthorized && allowedRoles.some(role => authorities.some(authority => authority === role))) { // If user is authorized and trying for Error Page redirecting to home page.
      this.router.navigateByUrl('/reports');
    }
    return isUnauthorized;
  }

}
