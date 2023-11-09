import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaisseComponent } from './caisse.component';
import { RouterModule, Routes } from '@angular/router';

const routes : Routes = [
  {
    path: '',
    component: CaisseComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CaisseRoutingModule { }
