import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaisseComponent } from './caisse.component';
import { CaisseRoutingModule } from './caisse-routing.module';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { SidebarModule } from 'primeng/sidebar';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CaisseComponent
  ],
  imports: [
    CommonModule,
    CaisseRoutingModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    InputNumberModule,
    SidebarModule,
    DialogModule,
    FormsModule
  ]
})
export class CaisseModule { }
