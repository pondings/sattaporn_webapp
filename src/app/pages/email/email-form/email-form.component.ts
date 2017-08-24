import { CustomerSelectorModalComponent } from './../../../shared/modals/customer-selector-modal/customer-selector-modal.component';
import { Customer } from './../../../shared/models/Customer';
import { Email } from './../../../shared/models/Email';
import { EmailAuthenModalComponent } from './../email-authen-modal/email-authen-modal.component';
import { EmailService } from './../../../shared/services/email.service';
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
  private form: FormGroup;
  private attactments: any;
  private email: Email = new Email();
  private customer: Customer;

  constructor(private fb: FormBuilder, private emailService: EmailService) {
    this.createForm();
  }

  ngOnInit() {
  }

  private setCustomerEmail(customer: Customer) {
    this.form.controls.sendTo.setValue(customer.email);
    this.customer = customer;
  }

  private openCustomerModal() {
    this.customerSelectorModalComponent.openModal();
  }

  private onsubmit(email: Email) {
    this.email = email;
    this.emailAuthenModalComponent.openModal();
  }

  private sendEmail(authEmail: Email) {
    this.email.username = authEmail.username;
    this.email.password = authEmail.password;
    this.emailService.sendEmail(this.email, this.attactments).then(
      (res) => console.log('Send email successfully')
    );
  }

  private fileChange(event: any) {
    this.attactments = event.target.files;
  }

  private createForm() {
    this.form = this.fb.group({
      content: ['TESTTEST', Validators.required],
      sendFrom: ['SattapornApplication', Validators.required],
      sendTo: ['unborn_pondzzz@hotmail.com', Validators.required],
      subject: ['Test email sender', Validators.required]
    });

    this.form.controls.sendTo.disable();
    this.form.controls.sendFrom.disable();
  }

}
