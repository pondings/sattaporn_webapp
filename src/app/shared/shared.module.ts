import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationModalComponent } from './modals/confirmation-modal/confirmation-modal.component';

/**
 * Third-Party
 */
import { ClarityModule } from 'clarity-angular';
import { DocumentListModalComponent } from './modals/document-list-modal/document-list-modal.component';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule
  ],
  declarations: [ConfirmationModalComponent, DocumentListModalComponent],
  exports: [ConfirmationModalComponent, DocumentListModalComponent]
})
export class SharedModule { }
