import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentRoutingModule } from './document-routing.module';
import { DocumentComponent } from './document.component';

/**
 * Third-Party
 */
import { ClarityModule } from 'clarity-angular';

@NgModule({
  imports: [
    CommonModule,
    DocumentRoutingModule,
    ClarityModule
  ],
  declarations: [DocumentComponent]
})
export class DocumentModule { }
