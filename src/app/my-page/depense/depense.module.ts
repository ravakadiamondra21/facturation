import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepenseComponent } from './depense.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepenseRoutingModule } from './depense-routing.module';
import { RouterModule } from '@angular/router';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {DialogModule} from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {DropdownModule} from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';
import  {HttpClientModule} from '@angular/common/http';
import { CheckboxModule } from 'primeng/checkbox';


@NgModule({
  declarations: [DepenseComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DepenseRoutingModule,
    TableModule,
    ToolbarModule,
    DialogModule,
    ButtonModule,
    CalendarModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    InputNumberModule,
    HttpClientModule,
    CheckboxModule,
  ],
 
})
export class DepenseModule { }
