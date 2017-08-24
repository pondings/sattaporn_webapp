import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import 'rxjs/Rx';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let transformedReq: HttpRequest<any> = req;

    if (req.headers.keys().length === 0) {
      transformedReq = req.clone({
        headers: req.headers.set('Content-Type', 'application/json')
      });
    }

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
