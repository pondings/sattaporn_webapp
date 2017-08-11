import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Third-Party
 */
import { ClarityModule } from 'clarity-angular';
import { TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule.forChild(),
    RouterModule,
    SharedModule,
    TranslateModule,
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class CoreModule { }
