import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutreComponent } from './autre.component';
import { AutreRoutingModule } from './autre-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SidebarModule } from 'primeng/sidebar';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { RadioButtonModule } from 'primeng/radiobutton';



@NgModule({
  declarations: [
    AutreComponent
  ],
  imports: [
    CommonModule,
    AutreRoutingModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    SidebarModule,
    InputNumberModule,
    FormsModule,
    TableModule,
    RadioButtonModule,
    ReactiveFormsModule
  ]
})
export class AutreModule { }
