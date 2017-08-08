import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

  @Input() modalTitle: string;
  @Input() modalBody: string;
  @Input() confirmBtn: string;
  @Input() closeBtn: string;
  @Output() result: EventEmitter<boolean> = new EventEmitter();
  public opened: boolean;

  constructor() { }

  ngOnInit() {
  }

  public confirmBtnClicked() {
    this.result.emit(true);
    this.opened = false;
  }

  public closeBtnClicked() {
    this.result.emit(false);
    this.opened = false;
  }

  public openConfirmationModal() {
    this.opened = true;
  }

  public closeConfirmationModal() {
    this.opened = false;
  }

}
