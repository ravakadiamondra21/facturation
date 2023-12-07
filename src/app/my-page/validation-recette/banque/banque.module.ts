import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BanqueComponent } from './banque.component';
import { BanqueRoutingModule } from './banque-routing.module';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BanqueComponent
  ],
  imports: [
    CommonModule,
    BanqueRoutingModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    SidebarModule,
    InputNumberModule,
    DialogModule,
    FormsModule
  ]
})
export class BanqueModule { }
