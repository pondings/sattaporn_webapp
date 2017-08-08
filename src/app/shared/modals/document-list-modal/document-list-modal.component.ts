import { Customer } from './../../models/Customer';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-list-modal',
  templateUrl: './document-list-modal.component.html',
  styleUrls: ['./document-list-modal.component.scss']
})
export class DocumentListModalComponent implements OnInit {

  public opened: boolean ;
  private customer: Customer;

  constructor() { }

  ngOnInit() {
  }

  public openDocumentListModal() {
    this.opened = true;
  }

  public closeDocumentListModal() {
    this.opened = false;
  }

  public openDocumentListModalWithCustomerCode(customer: Customer) {
    this.customer = customer;
    this.opened = true;
  }
}
