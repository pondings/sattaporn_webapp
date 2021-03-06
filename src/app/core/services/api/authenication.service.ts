import { Authenication } from './../../../shared/models/Authenication';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { LoginUserInfoInStorage, UserInfoService } from './../user-info.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../../environments/environment';

// tslint:disable-next-line:import-blacklist
import { Subject } from 'rxjs/Subject';

export class PermissionAccess {
  menuCode: string;
  userId: string;
  permission: string;
  menuName: string;
}

@Injectable()
export class AuthenicationService {

  protected url: string = environment.api;
  private authUrl = this.url + 'auth/';
  public landingPage = '/customer';

  constructor(private http: HttpClient, private userInfoService: UserInfoService, private router: Router) { }

  public checkPermission(menuName: string): Observable<PermissionAccess> {
    let permissionAccess: PermissionAccess = new PermissionAccess() ;
    permissionAccess.userId = this.userInfoService.getUserInfo().id;
    permissionAccess.menuName = menuName;

    const body = JSON.stringify(permissionAccess);
    const permissionSubject: Subject<PermissionAccess> = new Subject<PermissionAccess>();

    this.http.post<any>(this.authUrl + 'permission', body).subscribe(
      (res) => {
        permissionAccess = res;
        if (res != null) {
          permissionSubject.next(permissionAccess);
        }
        permissionSubject.next(permissionAccess);
      }
    );

    return permissionSubject;
  }

  public logout() {
    this.userInfoService.removeUserInfo();
    this.router.navigate(['auth/login']);
  }

  public login(auth: Authenication): Observable<any> {
    const body = auth;

    const loginDataSubject: Subject<any> = new Subject<any>();
    let loginInfoReturn: LoginUserInfoInStorage;

    this.http.post<any>(this.authUrl + 'login', body).subscribe(
      (res) => {
        if (res !== undefined && res !== null && res.operationStatus === 'SUCCESS') {

          loginInfoReturn = {
            'success': true,
            'message': res.operationMessage,
            'landingPage': this.landingPage,
            'user': {
              'id': res.item.id,
              'fullName': res.item.firstName + res.item.lastName,
              'email': res.item.email,
              'token': res.item.token
            }
          };
          this.userInfoService.storeUserInfo(JSON.stringify(loginInfoReturn.user));
        } else {
          loginInfoReturn = {
            'success': false,
            'message': res.operationMessage,
            'landingPage': 'auth/login'
          };
        }
        loginDataSubject.next(loginInfoReturn);
      }
    );

    return loginDataSubject;
  }

}
