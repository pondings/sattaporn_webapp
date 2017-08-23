import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EmailRoutingModule } from './email-routing.module';
import { EmailComponent } from './email.component';

import { ClarityModule } from 'clarity-angular';
import { TranslateModule} from '@ngx-translate/core';
import { EmailFormComponent } from './email-form/email-form.component';
import { EmailAuthenModalComponent } from './email-authen-modal/email-authen-modal.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmailRoutingModule,
    ClarityModule,
    TranslateModule
  ],
  declarations: [EmailComponent, EmailFormComponent, EmailAuthenModalComponent]
})
export class EmailModule { }
