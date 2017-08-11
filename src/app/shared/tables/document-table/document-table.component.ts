import { DocumentService } from './../../services/document.service';
import { Document } from './../../models/Document';
import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-document-table',
  templateUrl: './document-table.component.html',
  styleUrls: ['./document-table.component.scss']
})
export class DocumentTableComponent implements OnInit {

  public documentList = [];

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
  }

  public downloadFile(document: Document) {
    this.documentService.downloadDocument(document).subscribe(
      res => this.downloadComplete(res, document.name),
      error => console.log(error)
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

}
