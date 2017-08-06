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
  @ViewChild('btnGroup') btnGroupTemp: TemplateRef<any>;
  @ViewChild('phone') startPackageDateTemp: TemplateRef<any>;
  @ViewChild('code') codeTemp: TemplateRef<any>;
  @ViewChild('fullName') fullNameTemp: TemplateRef<any>;
  @ViewChild('address') addressTemp: TemplateRef<any>;
  @ViewChild('dataTable') dataTable;
  private rows: Customer[] = [];
  private columns;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.findAll();
    this.columns = [
      { prop: 'Code', cellTemplate: this.codeTemp },
      { name: 'Customer Name', cellTemplate: this.fullNameTemp },
      { name: 'Phone', cellTemplate: this.startPackageDateTemp },
      { name: 'Address', cellTemplate: this.addressTemp },
      { name: 'Command', cellTemplate: this.btnGroupTemp, width: 80, cellClass: 'text-center' }
    ];
  }

  private infoBtnClicked(customer: Customer) {
    this.viewCustomerInfo.emit(customer);
  }

  private findAll() {
    this.customerService.findAll().subscribe(rs => this.fillTable(rs), error => console.log(error));
  }

  private fillTable(data: Customer[]) {
    this.rows = data;
  }

  private addRecord(customer: Customer){
    this.rows.push(customer);
  }


}
