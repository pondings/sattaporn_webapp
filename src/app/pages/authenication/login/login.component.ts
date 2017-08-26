import { UserInfoService } from './../../../core/services/user-info.service';
import { AuthenicationService } from './../../../core/services/api/authenication.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthenicationService,
     private router: Router, private userInfoSerivce: UserInfoService) {
    this.createForm();
  }

  ngOnInit() {
    this.userInfoSerivce.removeUserInfo();
  }

  public onsubmit(formValue: any) {

    if (this.form.invalid) {
      this.form.controls.username.markAsTouched();
      this.form.controls.password.markAsTouched();
      return;
    }

    this.authService.login(formValue).subscribe(
      (res) => {
        if (res.user === undefined && res.user.token === undefined) {
          console.log('User or password incorrect !');
          return;
        }
        this.router.navigate([res.landingPage]);
      }
    );
  }

  private createForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

}
