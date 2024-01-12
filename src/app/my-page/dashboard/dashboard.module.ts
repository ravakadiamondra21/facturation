import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {ChartModule} from 'primeng/chart';
import {OrganizationChartModule} from 'primeng/organizationchart';
import { ButtonModule } from 'primeng/button';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ChartModule,
    OrganizationChartModule,
    ButtonModule,
    DatePipe
  ],
  providers: [DatePipe]
  
})
export class DashboardModule { }