import { ConfirmationModalComponent } from './../../shared/modals/confirmation-modal/confirmation-modal.component';
import { CustomerSearchComponent } from './../customer-search/customer-search.component';
import { CustomerService } from './../../shared/services/customer.service';
import { Customer } from './../../shared/models/Customer';
import { Component, OnInit, ViewChild, TemplateRef, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.scss']
})
export class CustomerTableComponent implements OnInit {

  @Output() viewCustomerInfo: EventEmitter<Customer> = new EventEmitter();
  @ViewChild(ConfirmationModalComponent) confirmationModalComponent: ConfirmationModalComponent;
  private customerList: Customer[] = [];
  private columns;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.findAll();
  }

  public infoBtnClicked(customer: Customer, index: number) {
    const targetCustomer: Customer = this.customerList[index];
    targetCustomer.index = index;
    customer.index = index;
    this.viewCustomerInfo.emit(targetCustomer);
  }

  private findAll() {
    this.customerService.findAll().subscribe(rs => this.fillTable(rs), error => console.log(error));
  }

  public editRow(customer: Customer) {
    let updatedCustomer: Customer = this.customerList[customer.index];
    updatedCustomer.fullName = customer.fullName;
    updatedCustomer.code = customer.code;
    updatedCustomer.phone = customer.phone;
    updatedCustomer.address = customer.address;
    updatedCustomer.document1 = customer.document1;
    updatedCustomer = customer;
    this.customerList[customer.index] = updatedCustomer;
  }

  private insertUpdateRowToTop(customer: Customer) {
    this.customerList.unshift(customer);
  }

  public removeBtnClicked(customer: Customer, index: number) {
    this.confirmationModalComponent.openConfirmationModal();
    this.confirmationModalComponent.result.subscribe(
      (res) => {
        if(res === true) {
          this.removeCustomer(customer, index);
        }
      },
      (error) => console.log(error)
    );
  }

  private removeCustomer(customer: Customer, index: number) {
    this.customerService.removeCustomer(customer).subscribe(rs => this.spliceTable(index), error => console.log(error));
  }

  public spliceTable(index: number) {
    this.customerList.splice(index, 1);
  }

  public fillTable(data: Customer[]) {
    this.customerList = data;
  }

  public addRecord(customer: Customer) {
    this.customerList.unshift(customer);
  }


}
