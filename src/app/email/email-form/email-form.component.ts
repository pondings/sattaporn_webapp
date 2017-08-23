import { Email } from './../../shared/models/Email';
import { EmailAuthenModalComponent } from './../email-authen-modal/email-authen-modal.component';
import { EmailService } from './../../shared/services/email.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss']
})
export class EmailFormComponent implements OnInit {

  @ViewChild(EmailAuthenModalComponent) emailAuthenModalComponent: EmailAuthenModalComponent;
  public form: FormGroup;
  public attactments: any;
  public email: Email = new Email();

  constructor(private fb: FormBuilder, private emailService: EmailService) {
    this.createForm();
  }

  ngOnInit() {
  }

  public onsubmit(email: Email) {
    this.email = email;
    this.emailAuthenModalComponent.openModal();
  }

  public sendEmail(authEmail: Email) {
    this.email.username = authEmail.username;
    this.email.password = authEmail.password;
    this.emailService.sendEmail(this.email, this.attactments).then(
      (res) => console.log('Send email successfully')
    );
  }

  public fileChange(event: any) {
    this.attactments = event.target.files;
  }

  private createForm() {
    this.form = this.fb.group({
      content: ['', Validators.required],
      sendFrom: ['', Validators.required],
      sendTo: ['', Validators.required],
      subject: ['', Validators.required]
    });
  }

}
