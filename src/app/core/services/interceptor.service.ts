import { LoadingService } from './../loading-screen/loading.service';
import { LoadingScreenComponent } from './../loading-screen/loading-screen.component';
import { UserInfoService } from './user-info.service';
import { Observable } from 'rxjs/Observable';
import { Injectable, ViewChild } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  @ViewChild(LoadingScreenComponent) loadingScreenComponent: LoadingScreenComponent;
  private apiPort: string;
  private apiProtocol: string;
  private apiHostName: string;
  public baseApiPath: string;

  constructor(private userInfoService: UserInfoService, private loadingService: LoadingService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.show();
    const token = this.userInfoService.getStoredToken();
    let headers;

    if (req.headers.keys().length > 0) {
      headers = new HttpHeaders({
        'Authorization': token === null ? '' : token
      });
    } else {
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token === null ? '' : token
      });
    }

    const transformedReq = req.clone({
      headers: headers
    });

    return next.handle(transformedReq).map(
      (res: HttpResponse<any>) => {
        return res;
      }).catch(
      (err) => {
        console.log(err);
        return Observable.throw(err);
      }
      ).finally(
        () => this.loadingService.hide()
      );
  }
}
