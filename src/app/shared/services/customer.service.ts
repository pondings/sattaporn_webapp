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
  private localUrl = this.url + 'customer/';

  constructor(protected http: Http) { }

  public downloadDocument(customer: Customer): any {
    return this.http.get(this.localUrl + 'downloadDocument/' + customer.code, { responseType: ResponseContentType.Blob }).map(
      (res) => {
        return new Blob([res.blob()], { type: 'application/pdf' });
      }
    );
  }

  private downloadFile(res: any) {
    console.log(res);
    const byteArray = new Uint8Array(res._body);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    saveAs(blob, 'test.pdf');
  }

  public uploadDocument(customer: Customer, fileList: FileList): Observable<Customer> {
    const formData: FormData = new FormData();
    const file: File = fileList[0];
    formData.append('file', file, file.name);
    formData.append('code', customer.code);
    const headers = new Headers();
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this.localUrl + 'uploadDocument', formData, options).map(this.extractData).catch(this.handlerError);
  }

  public updateCustomer(customer: Customer): Observable<Customer> {
    const options = this.getOptions();
    const body = JSON.stringify(customer);
    return this.http.put(this.localUrl + 'update', body, options).map(this.extractData).catch(this.handlerError);
  }

  public createCustomer(customer: Customer): Observable<Customer> {
    const options = this.getOptions();
    const body = JSON.stringify(customer);
    return this.http.post(this.localUrl + 'create', body, options).map(this.extractData).catch(this.handlerError);
  }

  public removeCustomer(customer: Customer): Observable<Boolean> {
    const options = this.getOptions();
    const id = customer.id;
    return this.http.delete(this.localUrl + 'remove/' + id, options).map(function () { return true; }).catch(this.handlerError);
  }

  public findCustomer(customer: Customer): Observable<[Customer[]]> {
    const options = this.getOptions();
    const body = JSON.stringify(customer);
    return this.http.post(this.localUrl + 'find', body, options).map(this.extractData).catch(this.handlerError);
  }

  public findAll() {
    const options = this.getOptions();
    return this.http.get(this.localUrl + 'showAll', options).map(this.extractData).catch(this.handlerError);
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
