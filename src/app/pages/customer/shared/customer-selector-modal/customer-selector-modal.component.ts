import { CustomerService } from './../customer.service';
import { Customer } from './../../../../shared/models/Customer';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-selector-modal',
  templateUrl: './customer-selector-modal.component.html',
  styleUrls: ['./customer-selector-modal.component.scss']
})
export class CustomerSelectorModalComponent implements OnInit {

  @Output() selectedCustomer: EventEmitter<Customer> = new EventEmitter();
  public opened = false;
  public customerList: Customer[] = [];
  public form: FormGroup;

  constructor(private customerService: CustomerService, private fb: FormBuilder) {
    this.createForm();
   }

  ngOnInit() {
    this.customerService.findAll().then(
      (res) => this.fillTable(res)
    );
  }

  private selectCustomer(customer: Customer) {
    this.selectedCustomer.emit(customer);
    this.closeModal();
  }

  public onsubmit(formValue: any) {
    const customer: Customer = new Customer;
    customer.searchKeyword = formValue.searchKeyword;
    customer.findMethod = formValue.findMethod;
    this.customerService.findCustomer(customer).then(
      (res) => this.fillTable(res)
    );
  }

  public resetForm() {
    this.form.reset();
    this.form.controls.findMethod.setValue('code');
  }

  private createForm() {
    this.form = this.fb.group({
      searchKeyword: '',
      findMethod: ['code', Validators.required]
    });
  }

  private fillTable(customerList: Customer[]) {
    this.customerList = customerList;
  }

  public openModal() {
    this.opened = true;
  }

  public closeModal() {
    this.opened = false;
  }

}
