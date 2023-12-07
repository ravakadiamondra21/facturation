import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BanqueComponent } from './banque.component';
import { BanqueRoutingModule } from './banque-routing.module';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    BanqueComponent
  ],
  imports: [
    CommonModule,
    BanqueRoutingModule,
    TableModule,
    InputTextModule,
    HttpClientModule
  ]
})
export class BanqueModule { }
