import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaisseComponent } from './caisse.component';
import { CaisseRoutingModule } from './caisse-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';



@NgModule({
  declarations: [
    CaisseComponent
  ],
  imports: [
    CommonModule,
    CaisseRoutingModule,
    HttpClientModule,
    TableModule,
    InputTextModule
  ]
})
export class CaisseModule { }
