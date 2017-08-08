import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-list-modal',
  templateUrl: './document-list-modal.component.html',
  styleUrls: ['./document-list-modal.component.scss']
})
export class DocumentListModalComponent implements OnInit {

  public opened: boolean ;

  constructor() { }

  ngOnInit() {
  }

  public openDocumentListModal() {
    this.opened = true;
  }

  public colseDocumentListModal() {
    this.opened = false;
  }

}
