import { UserInfoService } from './../../../shared/services/user-info.service';
import { Router } from '@angular/router';
import { AuthenicationService } from './../../../shared/services/api/authenication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthenicationService,
     private router: Router, private userInfoSerivce: UserInfoService) {
    this.createForm();
  }

  ngOnInit() {
    this.userInfoSerivce.removeUserInfo();
  }

  public onsubmit(formValue: any) {
    this.authService.login(formValue).subscribe(
      (res) => {
        if (res.user === undefined && res.user.token === undefined) {
          console.log('User or password incorrect !');
          return;
        }
        console.log(res.landingPage);
        this.router.navigate([res.landingPage]);
      }
    );
  }

  private createForm() {
    this.form = this.fb.group({
      username: '',
      password: ''
    });
  }

}
