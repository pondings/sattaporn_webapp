import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { CustomerSearchComponent } from './customer-search/customer-search.component';
import { CustomerTableComponent } from './customer-table/customer-table.component';
import { CustomerFormModalComponent } from './customer-form-modal/customer-form-modal.component';
/**
 * Third-Party
 */
import { ClarityModule } from 'clarity-angular';
import { TranslateModule} from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ClarityModule,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule,
  ],
  declarations: [CustomerComponent, CustomerSearchComponent, CustomerTableComponent, CustomerFormModalComponent]
})
export class CustomerModule { }
