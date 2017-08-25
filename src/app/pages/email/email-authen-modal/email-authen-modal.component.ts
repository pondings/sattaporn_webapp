import { UserInStorage, UserInfoService } from './../../../core/services/user-info.service';
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
  public userInfo: UserInStorage ;

  constructor(private fb: FormBuilder, private userInfoService: UserInfoService) {
    this.createForm();
  }

  ngOnInit() {
  }

  private createForm() {
    this.userInfo = this.userInfoService.getUserInfo();
    this.form = this.fb.group({
      username: [this.userInfo.email, Validators.required],
      password: ['', Validators.required]
    });
    this.form.controls.username.disable();
  }


  public onsubmit(form: any) {
    form.username = this.userInfo.email;
    this.authenEmail.emit(form);
    this.form.reset();
    this.closeModal();
  }

  public openModal() {
    this.opened = true;
    this.createForm();
  }

  public closeModal() {
    this.form.reset();
    this.opened = false;
  }

}
