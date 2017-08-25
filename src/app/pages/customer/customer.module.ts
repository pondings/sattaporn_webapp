import { DocumentModule } from './../document/document.module';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

/**
 * Third-Party
 */
import { ClarityModule } from 'clarity-angular';
import { TranslateModule } from '@ngx-translate/core';
import {
  CustomerManagementComponent, CustomerSearchFormComponent,
  CustomerFormModalComponent, CustomerTableComponent, CustomerSelectorModalComponent, CustomerService
} from './';


@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule,
    DocumentModule
  ],
  declarations: [
    CustomerManagementComponent,
    CustomerSearchFormComponent,
    CustomerFormModalComponent,
    CustomerTableComponent,
    CustomerSelectorModalComponent
  ],
  providers: [
    CustomerService
  ],
  exports: [
    CustomerSelectorModalComponent
  ]
})
export class CustomerModule { }
