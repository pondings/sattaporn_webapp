import { DocumentSearchFormComponent } from './shared/document-search-form/document-search-form.component';
import { DocumentManagementComponent } from './document-management/document-management.component';
import { DocumentSelectorModalComponent } from './shared/document-selector-modal/document-selector-modal.component';
import { DocumentModalComponent } from './shared/document-modal/document-modal.component';
import { DocumentTableComponent } from './shared/document-table/document-table.component';
import { DocumentService } from './shared/document.service';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

/**
 * Third-Party
 */
import { ClarityModule } from 'clarity-angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    SharedModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [
    DocumentSearchFormComponent,
    DocumentManagementComponent,
    DocumentModalComponent,
    DocumentTableComponent,
    DocumentSelectorModalComponent
  ],
  exports: [
    DocumentSelectorModalComponent,
    DocumentModalComponent
  ],
  providers: [
    DocumentService
  ]
})
export class DocumentModule { }
