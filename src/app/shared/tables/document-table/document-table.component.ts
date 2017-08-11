import { Document } from './../../models/Document';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-table',
  templateUrl: './document-table.component.html',
  styleUrls: ['./document-table.component.scss']
})
export class DocumentTableComponent implements OnInit {

  public documentList = [];

  constructor() { }

  ngOnInit() {
  }

  public addRow(document: Document) {
    this.documentList.unshift(document);
  }

  public fillTable(documentList: any) {
    this.documentList = documentList;
    console.log(documentList);
  }

}
