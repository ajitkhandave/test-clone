import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@sbs/ngpc-auth';
import { Observable } from 'rxjs';
import { AccessRole } from './access.role';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.authService.decodeToken();
    const authorities = (token && token.authorities) || [];
    let path = next.routeConfig.path;
    if (!path && next.queryParams && next.queryParams.menu) {
      path = next.queryParams.menu;
    } else if (!path) { // Home page navigation, this should be allowed.
      return true;
    }
    const isAllowed = AccessRole.isAllowed(authorities, path);
    if (!isAllowed) { // If permission is not allowed navigate user to error page for accessing url unauthorized.
      location.href = '\\' + 'reports/error';
    }
    return isAllowed;
  }

}
