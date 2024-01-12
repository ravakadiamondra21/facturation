import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BankingComponent } from './banking.component';
import { BankingModuleModule } from './banking-module.module';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [
    BankingComponent
  ],
  imports: [
    CommonModule,
    BankingModuleModule,
    TableModule,
    InputTextModule,
    HttpClientModule,
    ButtonModule,
    FileUploadModule,
    ReactiveFormsModule,
    SidebarModule,
    DataViewModule,
    DialogModule,
    DropdownModule
  ],
  providers: [DatePipe]
})
export class BankingModule { }
