import { DocumentModule } from './../pages/document/document.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationModalComponent } from './modals/confirmation-modal/confirmation-modal.component';
import { ValidatorDirective } from './directives/validator.directive';
import { RoleCheckerDirective } from './directives/role-checker.directive';
/**
 * Third-Party
 */
import { ClarityModule } from 'clarity-angular';
import { SettingModalComponent } from './modals/setting-modal/setting-modal.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [
    ConfirmationModalComponent,
    SettingModalComponent,
    ValidatorDirective,
    RoleCheckerDirective
  ],
  exports: [
    ConfirmationModalComponent,
    SettingModalComponent,
    ValidatorDirective,
    RoleCheckerDirective
  ]
})
export class SharedModule { }
