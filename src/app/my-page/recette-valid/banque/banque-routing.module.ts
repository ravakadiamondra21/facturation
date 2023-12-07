import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BanqueComponent } from './banque.component';

const route : Routes = [
  {
    path:'',
    component: BanqueComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ],
  exports: [
    RouterModule
  ]
})
export class BanqueRoutingModule { }
