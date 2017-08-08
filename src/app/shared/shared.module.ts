import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationModalComponent } from './modals/confirmation-modal/confirmation-modal.component';
import { DocumentListModalComponent } from './modals/document-list-modal/document-list-modal.component';
import { DocumentTableComponent } from './tables/document-table/document-table.component';
/**
 * Third-Party
 */
import { ClarityModule } from 'clarity-angular';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule
  ],
  declarations: [ConfirmationModalComponent, DocumentListModalComponent, DocumentTableComponent],
  exports: [ConfirmationModalComponent, DocumentListModalComponent]
})
export class SharedModule { }
