import { DocumentModule } from './../document/document.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationModalComponent } from './modals/confirmation-modal/confirmation-modal.component';
import { DocumentTableComponent } from './tables/document-table/document-table.component';
/**
 * Third-Party
 */
import { ClarityModule } from 'clarity-angular';
import { DocumentModalComponent } from './modals/document-modal/document-modal.component';
import { SettingModalComponent } from './modals/setting-modal/setting-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { ValidatorDirective } from './directives/validator.directive';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    DocumentModule,
    TranslateModule
  ],
  declarations: [ConfirmationModalComponent, DocumentTableComponent, DocumentModalComponent, SettingModalComponent, ValidatorDirective],
  exports: [ConfirmationModalComponent, DocumentModalComponent, SettingModalComponent, ValidatorDirective]
})
export class SharedModule { }
