import { element } from 'protractor';
import { RequestOptions, Headers } from '@angular/http';
import { Email } from './../models/Email';
import { Observable } from 'rxjs/Observable';
import { CommonService } from './common.service';
import { Injectable } from '@angular/core';

@Injectable()
export class EmailService extends CommonService {

  private api = this.url + 'email/';

  public sendEmail(email: Email, fileList: FileList): Observable<String> {
    const formData: FormData = new FormData();

    for (const key in fileList) {
      if (fileList.hasOwnProperty(key)) {
        const element = fileList[key];
        formData.append('files', element, element.name);
      }
    }

    const headers = new Headers();
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.api + 'send', formData, options).map(this.extractData).catch(this.handlerError);
  }

}
