import { Customer } from './../models/Customer';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { saveAs } from 'file-saver';

import { environment } from '../../../environments/environment';

@Injectable()
export class CustomerService {

  protected url: string = environment.api;
  private customerUrl = this.url + 'customer/';

  constructor(protected http: Http) { }

  public downloadDocument(customer: Customer): any {
    return this.http.get(this.customerUrl + 'downloadDocument/' + customer.code, { responseType: ResponseContentType.Blob }).map(
      (res) => {
        return new Blob([res.blob()], { type: 'application/word' });
      }
    );
  }


  public updateCustomer(customer: Customer): Observable<Customer> {
    const options = this.getOptions();
    const body = JSON.stringify(customer);
    return this.http.put(this.customerUrl + 'update', body, options).map(this.extractData).catch(this.handlerError);
  }

  public createCustomer(customer: Customer): Observable<Customer> {
    const options = this.getOptions();
    const body = JSON.stringify(customer);
    return this.http.post(this.customerUrl + 'create', body, options).map(this.extractData).catch(this.handlerError);
  }

  public removeCustomer(customer: Customer): Observable<Boolean> {
    const options = this.getOptions();
    return this.http.delete(this.customerUrl + 'remove/' + customer.id, options).map(function () { return true; }).catch(this.handlerError);
  }

  public findCustomer(customer: Customer): Observable<[Customer[]]> {
    const options = this.getOptions();
    const body = JSON.stringify(customer);
    return this.http.post(this.customerUrl + 'find', body, options).map(this.extractData).catch(this.handlerError);
  }

  public findAll() {
    const customer: Customer = new Customer();
    customer.findMethod = 'fullName';
    customer.searchKeyword = '';
    const body = JSON.stringify(customer);
    const options = this.getOptions();
    return this.http.post(this.customerUrl + 'find', body, options).map(this.extractData).catch(this.handlerError);
  }

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
