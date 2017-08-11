import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

/**
 * Third-Party
 */
import { TranslateService } from '@ngx-translate/core';

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
  @Output() indexAt: EventEmitter<number> = new EventEmitter();

  public opened: boolean;

  constructor(private translate: TranslateService) { }

  ngOnInit() {
  }

  public confirmBtnClicked() {
    this.result.emit(true);
    this.opened = false;
    this.result = new EventEmitter();
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
