import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup/signup.component';

import { ButtonModule } from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [SignupComponent],
  imports: [
    SignupRoutingModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule
  ]
})
export class SignupModule { }
