import { CustomerService } from './customer.service';
import { Document } from './../models/Document';
import { Customer } from './../models/Customer';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { saveAs } from 'file-saver';

import { environment } from '../../../environments/environment';

@Injectable()
export class DocumentService {

  protected url: string = environment.api;
  private documentUrl = this.url + 'documentation/';

  constructor(protected http: Http) { }

  public downloadDocument(document: Document): any {
    return this.http.get(this.documentUrl + 'downloadDocument/' + document.code, { responseType: ResponseContentType.Blob }).map(
      (res) => {
        return new Blob([res.blob()], { type: document.type });
      }
    );
  }

  public uploadDocument(document: Document, fileList: FileList): Observable<Document> {
    const formData: FormData = new FormData();
    const file: File = fileList[0];
    formData.append('file', file, file.name);
    formData.append('custId', document.customer.id.toString());
    const headers = new Headers();
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.documentUrl + 'uploadDocument', formData, options).map(this.extractData).catch(this.handlerError);
  }

  public findDocument(customer: Customer): Observable<Document> {
    const options = this.getOptions();
    const document: Document = new Document();
    document.customer = customer;
    const body = JSON.stringify(document);
    return this.http.post(this.documentUrl + 'find', body, options).map(this.extractData).catch(this.handlerError);
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
