import { DocumentModule } from './../document/document.module';
import { CustomerModule } from './../customer/customer.module';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EmailComponent } from './email.component';

import { ClarityModule } from 'clarity-angular';
import { TranslateModule} from '@ngx-translate/core';
import { EmailFormComponent } from './email-form/email-form.component';
import { EmailAuthenModalComponent } from './email-authen-modal/email-authen-modal.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    CustomerModule,
    ClarityModule,
    TranslateModule,
    DocumentModule
  ],
  declarations: [EmailComponent, EmailFormComponent, EmailAuthenModalComponent]
})
export class EmailModule { }
