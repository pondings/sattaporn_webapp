import { AuthenicationService } from './../../services/api/authenication.service';
import { Component, OnInit } from '@angular/core';

/**
 * Third-Party
 */
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-setting-modal',
  templateUrl: './setting-modal.component.html',
  styleUrls: ['./setting-modal.component.scss']
})
export class SettingModalComponent implements OnInit {

  public opened: boolean;

  constructor(private translate: TranslateService, private authService: AuthenicationService) { }

  ngOnInit() {
  }

  public openSetting() {
    this.opened = true;
  }

  public closeSetting() {
    this.opened = false;
  }

  public closeBtnClicked() {
    this.closeSetting();
  }

  public setCurrentLanguage(language: any) {
    this.translate.use(language.target.value);
  }

  public logout() {
    this.authService.logout();
  }

}
