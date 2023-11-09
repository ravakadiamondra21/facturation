import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaisseComponent } from './caisse.component';
import { CaisseRoutingModule } from './caisse-routing.module';
import { TableModule } from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';



@NgModule({
  declarations: [
    CaisseComponent
  ],
  imports: [
    CommonModule,
    CaisseRoutingModule,
    TableModule,
    SidebarModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule
  ]
})
export class CaisseModule { }
