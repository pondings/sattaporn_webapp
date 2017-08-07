import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailRoutingModule } from './email-routing.module';
import { EmailComponent } from './email.component';

@NgModule({
  imports: [
    CommonModule,
    EmailRoutingModule
  ],
  declarations: [EmailComponent]
})
export class EmailModule { }
