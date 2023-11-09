import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { Router } from 'express';

const route : Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path:'',
        redirectTo:'',
        pathMatch: 'full'
      }
    ]
  }
  
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ],
  exports:[
    RouterModule
  ]
})
export class DashboardRoutingModule { }
