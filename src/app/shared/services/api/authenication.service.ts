import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { LoginUserInfoInStorage, UserInfoService } from './../user-info.service';
import { Authenication } from './../../models/Authenication';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../../environments/environment';

// tslint:disable-next-line:import-blacklist
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthenicationService {

  protected url: string = environment.api;
  private authUrl = this.url + 'auth/';
  public landingPage = '/customer';

  constructor(private http: HttpClient, private userInfoService: UserInfoService, private router: Router) { }

  public logout() {
    this.userInfoService.removeUserInfo();
    this.router.navigate(['login']);
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
            'landingPage': '/login'
          };
        }
        loginDataSubject.next(loginInfoReturn);
      }
    );

    return loginDataSubject;
  }

}
