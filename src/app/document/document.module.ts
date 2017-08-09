import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentRoutingModule } from './document-routing.module';
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
    DocumentRoutingModule,
    ClarityModule,
    ReactiveFormsModule
  ],
  declarations: [DocumentComponent, DocumentSearchFormComponent],
  exports: [DocumentSearchFormComponent]
})
export class DocumentModule { }
