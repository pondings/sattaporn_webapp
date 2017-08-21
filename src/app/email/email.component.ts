import { Email } from './../shared/models/Email';
import { EmailService } from './../shared/services/email.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  public email: Email;
  public fileList: FileList;

  constructor(private emailService: EmailService) { }

  ngOnInit() {
    this.email = new Email();
  }

  public addFile(event) {
    const fileList = event.target.files;
    this.fileList = fileList;
  }

  public onsubmit() {
    this.emailService.sendEmail(this.email, this.fileList).subscribe(
      (res) => console.log(res)
    );
  }

}
