import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BanqueComponent } from './banque.component';
import { BanqueRoutingModule } from './banque-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';



@NgModule({
  declarations: [
    BanqueComponent
  ],
  imports: [
    CommonModule,
    BanqueRoutingModule,
    HttpClientModule,
    TableModule,
    InputTextModule
  ]
})
export class BanqueModule { }
