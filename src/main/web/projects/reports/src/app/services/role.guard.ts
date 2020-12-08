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
    const isAllowed = AccessRole.isAllowed(authorities, next.routeConfig.path);
    console.log('isAllowed', isAllowed);
    if (!isAllowed) { // If permission is not allowed navigate user to error page for accessing url unauthorized.
      location.href = '\\' + 'reports/error';
      return isAllowed;
    }
    return isAllowed;
  }

}
