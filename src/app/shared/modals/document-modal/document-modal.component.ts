import { DocumentService } from './../../services/document.service';
import { Customer } from './../../models/Customer';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-document-modal',
  templateUrl: './document-modal.component.html',
  styleUrls: ['./document-modal.component.scss']
})
export class DocumentModalComponent implements OnInit {

  @ViewChild('fileUploader') fileUploader: ElementRef;
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
    this.documentService.uploadDocument(null, fileList).subscribe(
      (rs) => {
        console.log(rs);
      }
    );
    this.fileUploader.nativeElement.value = '';
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
