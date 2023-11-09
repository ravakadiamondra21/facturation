import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DepenseComponent } from './depense.component';
import { Router } from 'express';

const route : Routes = [
  {
    path:'',
    component: DepenseComponent
  }
]

@NgModule({
  declarations: [  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ],
  exports: [
    RouterModule
  ]
})
export class DepenseRoutingModule { }
