import { Customer } from './../shared/models/Customer';
import { CustomerFormModalComponent } from './customer-form-modal/customer-form-modal.component';
import { Component, OnInit, ViewChild } from '@angular/core';

/**
 * Third-Party
 */
import { Tabs } from 'clarity-angular';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  @ViewChild(CustomerFormModalComponent) customerFormModal: CustomerFormModalComponent;

  constructor() { }

  ngOnInit() {
  }

  public viewCustomerInfo(customer: Customer) {
    this.customerFormModal.viewCustomerInfo(customer);
  }

  public addBtnClicked() {
    this.customerFormModal.createCustomer();
  }

}
