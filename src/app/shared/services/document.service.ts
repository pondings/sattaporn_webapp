import { CommonService } from './common.service';
import { CustomerService } from './customer.service';
import { Document } from './../models/Document';
import { Customer } from './../models/Customer';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class DocumentService extends CommonService {

  private documentUrl = this.url + 'documentation/';

  public removeDocument(document: Document): Observable<Boolean> {
    const options = this.getOptions();
    const id = document.id;
    return this.http.delete(this.documentUrl + 'remove/' + id, options).map(function () { return true; }).catch(this.handlerError);
  }

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

  public findDocument(document: Document): Observable<Document> {
    const options = this.getOptions();
    const body = JSON.stringify(document);
    return this.http.post(this.documentUrl + 'find', body, options).map(this.extractData).catch(this.handlerError);
  }

}
