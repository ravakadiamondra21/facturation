import { Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecetteComponent } from './recette.component';
import { RecetteRoutingModule } from './recette-routing.module';

import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {DialogModule} from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {DropdownModule} from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [RecetteComponent],
  imports: [
    CommonModule,
    RecetteRoutingModule,
    TableModule ,
    ToolbarModule,
    DialogModule,
    ButtonModule,
    CalendarModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    InputNumberModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class RecetteModule { }
