import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { Routes, RouterModule } from '@angular/router';

const route : Routes = [
  {
    path: '',
    component: SignupComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ]
})
export class SignupRoutingModule { }
