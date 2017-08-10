import { DocumentTableComponent } from './../../tables/document-table/document-table.component';
import { Document } from './../../models/Document';
import { DocumentService } from './../../services/document.service';
import { Customer } from './../../models/Customer';
import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

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
  @Output() uploadedDocument: EventEmitter<Document> = new EventEmitter();
  public opened: boolean;
  public customer: Customer;

  constructor(private documentService: DocumentService) { }

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
    this.documentService.uploadDocument(document, fileList).subscribe(
      (rs) => {
        this.uploadSuccess(rs);
      }, (error) => this.uploadError(error)
    );

  }

  private uploadError(error: any) {
    console.log(error);
    this.fileUploader.nativeElement.value = '';
    this.enableForm();
  }

  private uploadSuccess(document: Document) {
    this.enableForm();
    this.documentTable.addRow(document);
    this.fileUploader.nativeElement.value = '';
  }

  private disableForm() {
    this.uploadBtn.nativeElement.disable = true;
    this.closeBtn.nativeElement.disable = true;
  }

  private enableForm() {
    this.uploadBtn.nativeElement.disable = false;
    this.closeBtn.nativeElement.disable = false;
  }

  public openModal() {
    this.opened = true;
  }

  public openModalWithcustomer(customer: Customer) {
    this.opened = true;
    this.customer = customer;
  }

  public closeModal() {
    this.opened = false;
  }

}
