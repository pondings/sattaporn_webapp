import { CustomerService } from './../../shared/services/customer.service';
import { Customer } from './../../shared/models/Customer';
import { Component, OnInit, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Third-Party
 */
import { Modal } from 'clarity-angular';

@Component({
  selector: 'app-customer-form-modal',
  templateUrl: './customer-form-modal.component.html',
  styleUrls: ['./customer-form-modal.component.scss']
})
export class CustomerFormModalComponent implements OnInit {

  @ViewChild('customerFormModal') customerformModal: Modal;
  @Output() customerModel: EventEmitter<Customer> = new EventEmitter();
  private viewMode: Boolean ;
  private form: FormGroup;
  private opened: boolean;
  private customerFormModalHeader: string;

  constructor(private fb: FormBuilder, private customerService: CustomerService) {
    this.createForm();
  }

  ngOnInit() {
  }

  private createForm() {
    this.form = this.fb.group({
      sirName: [{value: '', disabled: this.viewMode}],
      name: [{value: '', disabled: this.viewMode}],
      lname: [{value: '', disabled: this.viewMode}],
      phone: [{value: '', disabled: this.viewMode}],
      address: [{value: '', disabled: this.viewMode}],
      workAddress: [{value: '', disabled: this.viewMode}]
    });
  }

  public onSubmit(form: Customer) {
    this.customerService.createCustomer(form).subscribe(rs => this.customerEmit(rs), error => console.log(error));
  }

  public customerEmit(customer: any) {
    this.customerModel.emit(customer);
    this.closeModal();
  }

  public openModal() {
    this.opened = true;
    this.customerFormModalHeader = 'test';
  }

  public createCustomer() {
    this.opened = true;
    this.customerFormModalHeader = 'Create Customer';
    this.viewMode = false;
    this.form.enable();
  }

  public viewCustomerInfo(customer: Customer){
    this.opened = true;
    this.customerFormModalHeader = 'View Customer Info';
    this.form.patchValue({
      sirName: customer.sirName,
      name: customer.name,
      lname: customer.lname,
      phone: customer.phone,
      address: customer.address,
      workAddress: customer.workAddress
    });
    this.form.disable();
  }

  public closeModal() {
    this.form.reset();
    this.viewMode = true;
    this.opened = false;
  }

}
