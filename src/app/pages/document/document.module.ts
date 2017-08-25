import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentComponent } from './document.component';
import { ReactiveFormsModule } from '@angular/forms';

/**
 * Third-Party
 */
import { ClarityModule } from 'clarity-angular';
import { DocumentSearchFormComponent } from './document-search-form/document-search-form.component';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [DocumentComponent, DocumentSearchFormComponent],
  exports: [DocumentSearchFormComponent]
})
export class DocumentModule { }
