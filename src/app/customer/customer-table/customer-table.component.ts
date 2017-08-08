import { ConfirmationModalComponent } from './../../shared/modals/confirmation-modal/confirmation-modal.component';
import { CustomerSearchComponent } from './../customer-search/customer-search.component';
import { CustomerService } from './../../shared/services/customer.service';
import { Customer } from './../../shared/models/Customer';
import { Component, OnInit, ViewChild, TemplateRef, EventEmitter, Output } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.scss']
})
export class CustomerTableComponent implements OnInit {

  @Output() viewCustomerInfo: EventEmitter<Customer> = new EventEmitter();
  @ViewChild('btnGroup') btnGroupTemp: TemplateRef<any>;
  @ViewChild('phone') phoneTemp: TemplateRef<any>;
  @ViewChild('code') codeTemp: TemplateRef<any>;
  @ViewChild('fullName') fullNameTemp: TemplateRef<any>;
  @ViewChild('address') addressTemp: TemplateRef<any>;
  @ViewChild('dataTable') dataTable: DatatableComponent;
  @ViewChild(ConfirmationModalComponent) confirmationModalComponent: ConfirmationModalComponent;
  private rows: Customer[] = [];
  private columns;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.findAll();
    this.columns = [
      { prop: 'Code', cellTemplate: this.codeTemp },
      { name: 'Customer Name', cellTemplate: this.fullNameTemp },
      { name: 'Phone', cellTemplate: this.phoneTemp },
      { name: 'Address', cellTemplate: this.addressTemp },
      { name: 'Command', cellTemplate: this.btnGroupTemp, width: 80, cellClass: 'text-center' }
    ];
  }

  private infoBtnClicked(customer: Customer, index: number) {
    const targetCustomer: Customer = this.rows[index];
    targetCustomer.index = index;
    customer.index = index;
    this.viewCustomerInfo.emit(targetCustomer);
  }

  private findAll() {
    this.customerService.findAll().subscribe(rs => this.fillTable(rs), error => console.log(error));
  }

  public editRow(customer: Customer) {
    let updatedCustomer: Customer = this.rows[customer.index];
    updatedCustomer.fullName = customer.fullName;
    updatedCustomer.code = customer.code;
    updatedCustomer.phone = customer.phone;
    updatedCustomer.address = customer.address;
    updatedCustomer.document1 = customer.document1;
    updatedCustomer = customer;
    this.rows[customer.index] = updatedCustomer;
  }

  private insertUpdateRowToTop(customer: Customer) {
    this.rows.unshift(customer);
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

  private spliceTable(index: number) {
    this.rows.splice(index, 1);
  }

  private fillTable(data: Customer[]) {
    this.rows = data;
  }

  private addRecord(customer: Customer) {
    this.rows.unshift(customer);
  }


}
