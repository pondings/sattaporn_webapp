import { CustomerService } from './customer.service';
import { Document } from './../models/Document';
import { Customer } from './../models/Customer';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { saveAs } from 'file-saver';

@Injectable()
export class CommonService {

  constructor(protected http: Http) { }

  protected getOptions(): RequestOptions {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return options;
  }

  protected extractStatusCode(res: Response) {
    if (res.status === 200) {
      return res.status;
    }
  }

  protected extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  protected handlerError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

}
