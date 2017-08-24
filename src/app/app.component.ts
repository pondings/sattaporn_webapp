import { UserInfoService } from './shared/services/user-info.service';
import { Component, ViewChild, AfterViewInit, Renderer } from '@angular/core';

/**
 * Third-Party
 */
import { TranslateService } from '@ngx-translate/core';
import { VerticalNav } from '../../node_modules/clarity-angular/layout/vertical-nav/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('verticalNav') verticalNav: VerticalNav;

  constructor(private translate: TranslateService, private userInfoService: UserInfoService, private renderer: Renderer) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngAfterViewInit() {
  }

  public clickedBody() {
    this.verticalNav.collapsed = true;
  }

}
