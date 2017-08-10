import { Document } from './../../models/Document';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-table',
  templateUrl: './document-table.component.html',
  styleUrls: ['./document-table.component.scss']
})
export class DocumentTableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public addRow(document: Document) {
    console.log(document);
  }

}
