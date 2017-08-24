import { AuthenicationService } from './api/authenication.service';
import { UserInfoService } from './user-info.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private router: Router, private userInfoService: UserInfoService, private authService: AuthenicationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
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
