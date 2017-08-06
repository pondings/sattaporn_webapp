import { Customer } from './../../shared/models/Customer';
import { CustomerService } from './../../shared/services/customer.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.scss']
})
export class CustomerSearchComponent implements OnInit {

  private form: FormGroup;
  @Output() searchResult: EventEmitter<Customer[]> = new EventEmitter();

  constructor(private fb: FormBuilder, private customerService: CustomerService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.form = this.fb.group({
      searchKeyword: '',
      findMethod: ['', Validators.required]
    });
  }

  public onSubmit(customer: Customer) {
    this.customerService.findCustomer(customer).subscribe(rs => this.emitResult(rs), error => console.log(error));
  }

  public emitResult(customerList: any) {
    this.searchResult.emit(customerList);
  }

  private resetForm() {
    this.form.reset();
  }


}
