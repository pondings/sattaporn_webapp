import { Document } from './../../../../shared/models/Document';
import { DocumentService } from './../document.service';
import { ConfirmationModalComponent } from './../../../../shared/modals/confirmation-modal/confirmation-modal.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { saveAs } from 'file-saver';

/**
 * Third-Party
 */
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-document-table',
  templateUrl: './document-table.component.html',
  styleUrls: ['./document-table.component.scss']
})
export class DocumentTableComponent implements OnInit {

  @ViewChild(ConfirmationModalComponent) confirmationModalComponent: ConfirmationModalComponent;
  public documentList = [];

  constructor(private documentService: DocumentService, private translate: TranslateService) { }

  ngOnInit() {
  }

  public removeFile(document: Document, index: number) {
    this.confirmationModalComponent.openConfirmationModal();
    this.confirmationModalComponent.result.subscribe(
      (result) => {
        if (result === true) {
          this.documentService.removeDocument(document).then(
            (res) => this.spliceTable(index)
          );
        }
      }
    );
  }

  public spliceTable(index: number) {
    this.documentList.splice(index, 1);
  }

  public downloadFile(document: Document) {
    this.documentService.downloadDocument(document).then(
      (res) => this.downloadComplete(res, document.name)
    );
  }

  private downloadComplete(res: any, fileName: string) {
    saveAs(res, fileName);
  }

  public addRow(document: Document) {
    this.documentList.unshift(document);
  }

  public fillTable(documentList: any) {
    this.documentList = documentList;
    console.log(documentList);
  }

  public removeAllRecord() {
    this.documentList = [];
  }

}
