import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {ChartModule} from 'primeng/chart';
import {OrganizationChartModule} from 'primeng/organizationchart';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ChartModule,
    OrganizationChartModule,
    ButtonModule
  ],
  
})
export class DashboardModule { }