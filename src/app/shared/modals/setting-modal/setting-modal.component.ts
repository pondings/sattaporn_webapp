import { UserInfoService, UserInStorage } from './../../services/user-info.service';
import { AuthenicationService } from './../../services/api/authenication.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

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

  @ViewChild('logoutBtn') logoutBtn: ElementRef;
  private opened: boolean;
  private userInfo: UserInStorage;

  private get isLoggedIn(): boolean {
    return this.userInfoService.isLoggedIn();
  }

  constructor(private translate: TranslateService, private authService: AuthenicationService,
    private userInfoService: UserInfoService) { }

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
    this.opened = false;
  }

}
