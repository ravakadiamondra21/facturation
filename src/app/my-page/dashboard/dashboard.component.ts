import { Component, OnInit } from '@angular/core';
import { toChildArray } from '@fullcalendar/core/preact';
import { RecetteRoutingModule } from '../recette/recette-routing.module';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../../assets/demo/badges.scss' , './dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
    constructor(private dashboardServie: DashboardService){}

  ordersChart: any;

  ordersOptions: any;

  ngOnInit(){
    this.ordersChart = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'],
      datasets: [{
          label: 'Revenue',
          data: [31, 83, 69, 29, 62, 25, 59, 26, 46],
          borderColor: [
              '#f1b263',
          ],
          backgroundColor: [
              'rgba(241, 178, 99, 0.1)'
          ],
          borderWidth: 2,
          fill: true,
          borderDash: [3, 6],
          tension: .4
      }, {
          label: 'Cost',
          data: [67, 98, 27, 88, 38, 3, 22, 60, 56],
          borderColor: [
              '#2f8ee5',
          ],
          backgroundColor: [
              'rgba(47, 142, 229, 0.05)',
          ],
          borderWidth: 2,
          fill: true,
          pointRadius: 3,
          tension: .4
      }],
      responsive: true
  };

  }

  countFacture(){
      var depense;
      var recette;
      
      this.dashboardServie.getDepense().subscribe(
          response => {
              depense = response
              let depenseToStore = JSON.stringify(depense.length)
              localStorage.setItem("depense", depenseToStore);
          }
      )
      this.dashboardServie.getRecette().subscribe(
          response => {
            recette = response;
            let recetteToStore = JSON.stringify(recette.length)
            localStorage.setItem("recette", recetteToStore)
          }
      )
  }

  addNbFacture(): Number{
    var nbFacture = Number(localStorage.getItem("recette")) + Number(localStorage.getItem("depense"))
    return nbFacture;
  }

  getByDate(date: Date){
      this.dashboardServie.getDepenseByDate(date).subscribe(
          response => {
              var today = response
              return today
          }
      )
      
  }

  routerLink: string;
  logout(){
      localStorage.removeItem("admin");
      this.routerLink = '/mylogin'
      console.log(localStorage.getItem("admin"))
  }
}
