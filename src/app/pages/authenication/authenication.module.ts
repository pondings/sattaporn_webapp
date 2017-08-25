import { SharedModule } from './../../shared/shared.module';
import { ClarityModule } from 'clarity-angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClarityModule,
    SharedModule
  ],
  declarations: [
    LoginComponent,
    NotFoundComponent
  ]
})
export class AuthenicationModule { }
