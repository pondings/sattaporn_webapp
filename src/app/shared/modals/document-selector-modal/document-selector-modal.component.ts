import { DocumentService } from './../../services/api/document.service';
import { Document } from './../../models/Document';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-document-selector-modal',
  templateUrl: './document-selector-modal.component.html',
  styleUrls: ['./document-selector-modal.component.scss']
})
export class DocumentSelectorModalComponent implements OnInit {

  @Output() selectedDocument: EventEmitter<string> = new EventEmitter();
  private opened = false;
  private documentList: Document[] = [];
  private form: FormGroup;
  private custCode: string;

  constructor(private documentService: DocumentService, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  private selectDocument(document: Document) {
    this.selectedDocument.emit(document.code);
    this.closeModal();
  }

  private onsubmit(formValue: any) {
    const document: Document = (formValue.findMethod === 'name' ? new Document().getFindByDocumentnameAndCustomerCode(
      formValue.searchKeyword, this.custCode) : new Document().getFindDocumentObject(formValue.searchKeyword, formValue.findMethod));

      this.documentService.findDocument(document).then(
      (res) => this.fillTable(res)
    );
  }

  private resetForm() {
    this.createForm();
  }

  private createForm() {
    this.form = this.fb.group({
      searchKeyword: '',
      findMethod: ['code', Validators.required]
    });
  }

  private fillTable(documentList: Document[]) {
    this.documentList = documentList;
  }

  public openModal(custCode: string) {
    const document: Document = new Document().getFindDocumentObject(custCode, 'custCode');
    this.documentService.findDocument(document).then(
      (res) => this.fillTable(res)
    );
    this.custCode = custCode;
    this.opened = true;
  }

  public closeModal() {
    this.opened = false;
  }

}
