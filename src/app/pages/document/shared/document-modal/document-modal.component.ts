import { Document } from './../../../../shared/models/Document';
import { Customer } from './../../../../shared/models/Customer';
import { DocumentService } from './../document.service';
import { DocumentTableComponent } from './../document-table/document-table.component';
import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

/**
 * Third-Party
 */
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-document-modal',
  templateUrl: './document-modal.component.html',
  styleUrls: ['./document-modal.component.scss']
})
export class DocumentModalComponent implements OnInit {

  @ViewChild('documentTable') documentTable: DocumentTableComponent;
  @ViewChild('fileUploader') fileUploader: ElementRef;
  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('uploadBtn') uploadBtn: ElementRef;

  public opened: boolean;
  public customer: Customer;
  public transactionStatus: string;

  constructor(private documentService: DocumentService, private translate: TranslateService) { }

  ngOnInit() {
  }

  public openFileUploader() {
    this.fileUploader.nativeElement.click();
  }

  public fileChange(event) {
    const fileList: FileList = event.target.files;
    const document: Document = new Document();
    this.disableForm();
    document.customer = this.customer;
    this.transactionStatus = 'Uploading..';
    this.documentService.uploadDocument(document, fileList).then(
      (res) => this.uploadSuccess(res)
    );

  }

  private uploadError(error: any) {
    console.log(error);
    this.fileUploader.nativeElement.value = '';
    this.transactionStatus = 'Content type not support !';
    this.setTransactionStatusTimeOut();
    this.enableForm();
  }

  private uploadSuccess(document: Document) {
    this.enableForm();
    this.documentTable.addRow(document);
    this.fileUploader.nativeElement.value = '';
    this.transactionStatus = 'Upload Success !';
    this.setTransactionStatusTimeOut();
  }

  private setTransactionStatusTimeOut() {
    setTimeout(() => {
      this.transactionStatus = '';
    }, 5000);
  }

  private findDocument(document: Document) {
    this.documentService.findDocument(document).then(
      (res) => this.documentTable.fillTable(res)
    );
  }

  private disableForm() {
    this.uploadBtn.nativeElement.disabled = true;
    this.closeBtn.nativeElement.disabled = true;
  }

  private enableForm() {
    this.uploadBtn.nativeElement.disabled = false;
    this.closeBtn.nativeElement.disabled = false;
  }

  public openModal() {
    this.opened = true;
  }

  public openModalWithcustomer(customer: Customer) {
    this.opened = true;
    this.customer = customer;
    this.documentTable.removeAllRecord();
    const document: Document = new Document();
    document.findMethod = 'custCode';
    document.searchKeyword = customer.code;
    this.findDocument(document);
  }

  public closeModal() {
    this.opened = false;
  }

}
