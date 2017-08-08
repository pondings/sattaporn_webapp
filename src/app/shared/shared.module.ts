import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationModalComponent } from './modals/confirmation-modal/confirmation-modal.component';

/**
 * Third-Party
 */
import { ClarityModule } from 'clarity-angular';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule
  ],
  declarations: [ConfirmationModalComponent],
  exports: [ConfirmationModalComponent]
})
export class SharedModule { }
