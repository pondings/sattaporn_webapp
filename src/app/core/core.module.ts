import { InterceptorService } from './services/interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenicationService } from './services/api/authenication.service';
import { Authenication } from './../shared/models/Authenication';
import { UserInfoService } from './services/user-info.service';
import { AuthGuardService } from './services/auth-gurad.service';
import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Third-Party
 */
import { ClarityModule } from 'clarity-angular';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule.forChild(),
    RouterModule,
    SharedModule,
    TranslateModule,
  ],
  declarations: [HeaderComponent, LoadingScreenComponent],
  exports: [HeaderComponent],
  providers: [
    AuthGuardService,
    UserInfoService,
    AuthenicationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ]
})
export class CoreModule { }
