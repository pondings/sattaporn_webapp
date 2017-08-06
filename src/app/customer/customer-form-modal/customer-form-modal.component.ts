import { CustomerService } from './../../shared/services/customer.service';
import { Customer } from './../../shared/models/Customer';
import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
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
  private form: FormGroup;
  private opened: boolean;

  constructor(private fb: FormBuilder, private customerService: CustomerService) {
    this.createForm();
  }

  ngOnInit() {
  }

  private createForm() {
    this.form = this.fb.group({
      sirName: '',
      name: '',
      lname: '',
      phone: '',
      address: '',
      workAddress: ''
    });
  }

  public onSubmit(form: Customer) {
    this.customerService.createCustomer(form).subscribe(rs => this.customerEmit(rs),error => console.log(error));
  }

  public customerEmit(customer: any) {
    this.customerModel.emit(customer);
    this.closeModal();
  }

  public openModal() {
    this.opened = true;
  }

  public closeModal() {
    this.form.reset();
    this.opened = false;
  }

}
