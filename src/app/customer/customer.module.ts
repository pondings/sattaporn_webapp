import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { CustomerSearchComponent } from './customer-search/customer-search.component';
import { CustomerTableComponent } from './customer-table/customer-table.component';
/**
 * Third-Party
 */
import { ClarityModule } from 'clarity-angular';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CustomerFormModalComponent } from './customer-form-modal/customer-form-modal.component';

@NgModule({
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ClarityModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    SharedModule
  ],
  declarations: [CustomerComponent, CustomerSearchComponent, CustomerTableComponent, CustomerFormModalComponent]
})
export class CustomerModule { }
