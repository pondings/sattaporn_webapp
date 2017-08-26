import { CustomerService } from './../customer.service';
import { TranslateService } from '@ngx-translate/core';
import { Customer } from './../../../../shared/models/Customer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-customer-search-form',
  templateUrl: './customer-search-form.component.html',
  styleUrls: ['./customer-search-form.component.scss']
})
export class CustomerSearchFormComponent implements OnInit {

  public form: FormGroup;
  @Output() searchResult: EventEmitter<Customer[]> = new EventEmitter();

  constructor(private fb: FormBuilder, private customerService: CustomerService, private translate: TranslateService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.form = this.fb.group({
      searchKeyword: '',
      findMethod: ['fullName', Validators.required]
    });
  }

  public onSubmit(customer: Customer) {
    this.customerService.findCustomer(customer).then((res) => this.emitResult(res));
  }

  public emitResult(customerList: any) {
    this.searchResult.emit(customerList);
  }

  public resetForm() {
    this.customerService.findAll().then((res) => this.emitResult(res));
    this.form.reset();
    this.form.controls.findMethod.setValue('fullName');
  }

}
