import { DocumentSelectorModalComponent } from './../../document/';
import { CustomerSelectorModalComponent } from './../../customer/';
import { Customer } from './../../../shared/models/Customer';
import { Email } from './../../../shared/models/Email';
import { EmailAuthenModalComponent } from './../email-authen-modal/email-authen-modal.component';
import { EmailService } from './../../../shared/services/api/email.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss']
})
export class EmailFormComponent implements OnInit {

  @ViewChild(EmailAuthenModalComponent) emailAuthenModalComponent: EmailAuthenModalComponent;
  @ViewChild(CustomerSelectorModalComponent) customerSelectorModalComponent: CustomerSelectorModalComponent;
  @ViewChild(DocumentSelectorModalComponent) documentSelectorModalComponent: DocumentSelectorModalComponent;
  public form: FormGroup;
  private attactments: any;
  private email: Email = new Email();
  public customer: Customer;
  public documentCodes: string[] = [];

  constructor(private fb: FormBuilder, private emailService: EmailService) {
    this.createForm();
  }

  ngOnInit() {
  }

  public setDocumentList(docCode: string) {
    this.documentCodes.push(docCode);
    this.documentCodes = this.documentCodes.filter(
      (item, pos, self) => {
        return self.indexOf(item) === pos;
      }
    );
  }

  public openDocumentModal() {
    this.documentSelectorModalComponent.openModal(this.customer.code);
  }

  public setCustomerEmail(customer: Customer) {
    this.form.controls.sendTo.setValue(customer.email);
    this.customer = customer;
  }

  public openCustomerModal() {
    this.customerSelectorModalComponent.openModal();
  }

  public onsubmit(email: Email) {
    this.email = email;
    this.email.sendTo = this.customer.email;
    this.email.sendFrom = 'SattapornApplication';
    this.emailAuthenModalComponent.openModal();
  }

  public sendEmail(authEmail: Email) {
    this.email.username = authEmail.username;
    this.email.password = authEmail.password;
    this.emailService.sendEmail(this.email, this.attactments, this.documentCodes).then(
      (res) => console.log('Send email successfully')
    );
  }

  public fileChange(event: any) {
    this.attactments = event.target.files;
  }

  private createForm() {
    this.form = this.fb.group({
      content: ['', Validators.required],
      sendFrom: ['SattapornApplication', Validators.required],
      sendTo: ['', Validators.required],
      subject: ['', Validators.required]
    });

    this.form.controls.sendTo.disable();
    this.form.controls.sendFrom.disable();
  }

  public resetForm() {
    this.createForm();
  }

}
