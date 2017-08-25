import { Document } from './../../../shared/models/Document';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { ResponseContentType } from '@angular/http';

import { environment } from './../../../../environments/environment';


@Injectable()
export class DocumentService {

  protected url: string = environment.api + 'documentation/';

  constructor(private http: HttpClient) { }

  public removeDocument(document: Document): Promise<Boolean> {
    const id = document.id;
    return this.http.delete<Boolean>(this.url + 'remove/' + id).toPromise();
  }

  public downloadDocument(document: Document): Promise<Blob> {

    const options = { responseType: 'blob' as 'blob'};

    return this.http.get(this.url + 'downloadDocument/' + document.code, options).map(
      (res) => {
        return new Blob([res], { type: document.type });
      }
    ).toPromise();
  }

  public uploadDocument(document: Document, fileList: FileList): Promise<Document> {
    const formData: FormData = new FormData();
    const file: File = fileList[0];
    formData.append('file', file, file.name);
    formData.append('custId', document.customer.id.toString());
    return this.http.post<Document>(this.url + 'uploadDocument', formData, {
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json' }
      )
    }).toPromise();
  }

  public findDocument(document: Document): Promise<Document[]> {
    const body = JSON.stringify(document);
    return this.http.post<Document[]>(this.url + 'find', body).toPromise();
  }

}
