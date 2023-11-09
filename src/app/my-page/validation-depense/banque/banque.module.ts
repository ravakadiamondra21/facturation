import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BanqueComponent } from './banque.component';
import { TableModule } from 'primeng/table';
import { BanqueRoutingModule } from './banque-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SidebarModule } from 'primeng/sidebar';
import { InputNumberModule } from 'primeng/inputnumber';


@NgModule({
  declarations: [
    BanqueComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    BanqueRoutingModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    SidebarModule,
    InputNumberModule
  ]
})
export class BanqueModule { }
