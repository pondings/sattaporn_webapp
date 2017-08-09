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
export class DocumentService extends CustomerService {

  private documentUrl = this.url + 'ducmentation/';

  public uploadDocument(document: Document, fileList: FileList): Observable<Document> {
    const formData: FormData = new FormData();
    const file: File = fileList[0];
    console.log(file.name);
    formData.append('file', file, file.name);
    const headers = new Headers();
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.documentUrl + 'uploadDocument', formData, options).map(this.extractData).catch(this.handlerError);
  }

}
