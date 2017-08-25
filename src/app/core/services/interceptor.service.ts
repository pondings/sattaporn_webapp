import { UserInfoService } from './user-info.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  private apiPort: string;
  private apiProtocol: string;
  private apiHostName: string;
  public baseApiPath: string;

  constructor(private userInfoService: UserInfoService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

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
        console.log('Error in request : ' + err);
        return Observable.throw(err);
      }
      );
  }
}
