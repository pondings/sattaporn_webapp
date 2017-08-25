import { AuthenicationService, PermissionAccess } from './api/authenication.service';
import { UserInfoService } from './user-info.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private router: Router, private userInfoService: UserInfoService, private authService: AuthenicationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('Well redirect ');
    const url: string = state.url;
    const isLoggedIn = this.checkLogin(url);
    if (!isLoggedIn) { return false; }
    return this.authService.checkPermission(url).map(res => {
      console.log(res);
      if (res) {
        this.userInfoService.setCurrentPermission(res);
        return true;
      }
      this.router.navigate(['not-found']);
      return false;
    }).take(1);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }

  checkLogin(url: string): boolean {
    if (this.userInfoService.isLoggedIn()) {
      return true;
    }
    this.authService.landingPage = url;
    this.router.navigate(['login']);
    return false;
  }

}
