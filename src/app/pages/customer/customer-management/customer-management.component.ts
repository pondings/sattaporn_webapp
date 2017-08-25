import { CustomerFormModalComponent } from './../';
import { Customer } from './../../../shared/models/';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.scss']
})
export class CustomerManagementComponent implements OnInit {

  @ViewChild('customerFormModal') customerFormModal: CustomerFormModalComponent;

  constructor(private translate: TranslateService) { }

  ngOnInit() {
  }

  public viewCustomerInfo(customer: Customer) {
    this.customerFormModal.viewCustomerInfo(customer);
  }

  public addBtnClicked() {
    this.customerFormModal.createCustomer();
  }
}
