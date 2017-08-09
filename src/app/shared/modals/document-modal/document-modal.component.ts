import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-modal',
  templateUrl: './document-modal.component.html',
  styleUrls: ['./document-modal.component.scss']
})
export class DocumentModalComponent implements OnInit {

  public opened: boolean;

  constructor() { }

  ngOnInit() {
  }

  public openModal() {
    this.opened = true;
  }

  public closeModl() {
    this.opened = false;
  }

}
