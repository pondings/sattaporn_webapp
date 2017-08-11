import { SettingModalComponent } from './../../shared/modals/setting-modal/setting-modal.component';
import { Component, OnInit, ViewChild } from '@angular/core';

/**
 * Third-Party
 */
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild(SettingModalComponent) settingModalComponent: SettingModalComponent;

  constructor(private translate: TranslateService) { }

  ngOnInit() {
  }

  public openSettingModal() {
    this.settingModalComponent.openSetting();
  }

}
