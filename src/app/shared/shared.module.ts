import { CustomerTableComponent } from './tables/customer-table/customer-table.component';
import { DocumentModule } from './../pages/document/document.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
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
import { CustomerSelectorModalComponent } from './modals/customer-selector-modal/customer-selector-modal.component';
import { DocumentSelectorModalComponent } from './modals/document-selector-modal/document-selector-modal.component';
import { RoleCheckerDirective } from './directives/role-checker.directive';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [
    ConfirmationModalComponent,
    DocumentTableComponent,
    DocumentModalComponent,
    SettingModalComponent,
    ValidatorDirective,
    CustomerSelectorModalComponent,
    CustomerTableComponent,
    DocumentSelectorModalComponent,
    RoleCheckerDirective
  ],
  exports: [
    ConfirmationModalComponent,
    DocumentModalComponent,
    SettingModalComponent,
    ValidatorDirective,
    CustomerSelectorModalComponent,
    CustomerTableComponent,
    DocumentSelectorModalComponent,
    RoleCheckerDirective
  ]
})
export class SharedModule { }
