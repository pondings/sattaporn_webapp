import { element } from 'protractor';
import { Email } from './../../models/Email';
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from './../../../../environments/environment';

@Injectable()
export class EmailService {

  protected url: string = environment.api + 'email/';

  constructor(private http: HttpClient) { }

  public sendEmail(email: Email, fileList: FileList, docCodes: string[]): Promise<String> {
    const formData: FormData = new FormData();

    formData.append('content', email.content);
    formData.append('password', email.password);
    formData.append('sendFrom', email.sendFrom);
    formData.append('sendTo', email.sendTo);
    formData.append('subject', email.subject);
    formData.append('username', email.username);

    for (const key in fileList) {
      if (fileList.hasOwnProperty(key)) {
        const element = fileList[key];
        formData.append('files', element, element.name);
      }
    }

    for (const key in docCodes) {
      if (docCodes.hasOwnProperty(key)) {
        const element = docCodes[key];
        formData.append('docCodes', element);
      }
    }

    return this.http.post<string>(this.url + 'send', formData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).toPromise();
  }

}
