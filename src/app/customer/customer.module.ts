import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';

/**
 * Third-Party
 */
import { ClarityModule, Tabs } from 'clarity-angular';
import { CustomerSearchComponent } from './customer-search/customer-search.component';

@NgModule({
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ClarityModule,
    ReactiveFormsModule
  ],
  declarations: [CustomerComponent, CustomerSearchComponent]
})
export class CustomerModule { }
