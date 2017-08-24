import { Email } from './../../../shared/models/Email';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-authen-modal',
  templateUrl: './email-authen-modal.component.html',
  styleUrls: ['./email-authen-modal.component.scss']
})
export class EmailAuthenModalComponent implements OnInit {

  @Output() authenEmail: EventEmitter<Email> = new EventEmitter();
  public opened = false;
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  private createForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public onsubmit(form: any) {
    this.authenEmail.emit(form);
    this.form.reset();
    this.closeModal();
  }

  public openModal() {
    this.opened = true;
  }

  public closeModal() {
    this.form.reset();
    this.opened = false;
  }

}
