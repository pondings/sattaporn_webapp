import { DocumentModule } from './../document/document.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationModalComponent } from './modals/confirmation-modal/confirmation-modal.component';
import { DocumentTableComponent } from './tables/document-table/document-table.component';
/**
 * Third-Party
 */
import { ClarityModule } from 'clarity-angular';
import { DocumentModalComponent } from './modals/document-modal/document-modal.component';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    DocumentModule
  ],
  declarations: [ConfirmationModalComponent, DocumentTableComponent, DocumentModalComponent],
  exports: [ConfirmationModalComponent, DocumentModalComponent]
})
export class SharedModule { }
