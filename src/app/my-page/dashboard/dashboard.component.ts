import { Component, OnInit } from "@angular/core";
import { DashboardService } from "./dashboard.service";
import * as moment from 'moment';
import { DepenseComponent } from "../depense/depense.component";
import { Subject } from "rxjs";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: [
        "../../../assets/demo/badges.scss",
        "./dashboard.component.scss",
    ],
    
})
export class DashboardComponent implements OnInit {
    depense
    recette 
    
    depense_daily : Number[] = [];
    recette_daily : Number[] = []
    constructor(
        private dashboardServie: DashboardService,
        
    ) {
    }

    ordersChart: any;

    ordersOptions: any;

    ngOnInit() {
        this.ordersChart = {
            labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
            ],
            datasets: [
                {
                    label: "Revenue",
                    data: [31, 83, 69, 29, 62, 25, 59, 26, 46],
                    borderColor: ["#f1b263"],
                    backgroundColor: ["rgba(241, 178, 99, 0.1)"],
                    borderWidth: 2,
                    fill: true,
                    borderDash: [3, 6],
                    tension: 0.4,
                },
                {
                    label: "Cost",
                    data: [67, 98, 27, 88, 38, 3, 22, 60, 56],
                    borderColor: ["#2f8ee5"],
                    backgroundColor: ["rgba(47, 142, 229, 0.05)"],
                    borderWidth: 2,
                    fill: true,
                    pointRadius: 3,
                    tension: 0.4,
                },
            ],
            responsive: true,
        };

        this.addNbFacture();
        //this.Facture_saisie_daily();
        //this.getCountRecette()
        
        
    }

    countFacture() {
        var depense;
        var recette;

        this.dashboardServie.getDepense().subscribe((response) => {
            depense = response;
            let depenseToStore = JSON.stringify(depense.length);
            localStorage.setItem("depense", depenseToStore);
            console.log(depenseToStore);
        });
        this.dashboardServie.getRecette().subscribe((response) => {
            recette = response;
            let recetteToStore = JSON.stringify(recette.length);
            localStorage.setItem("recette", recetteToStore);
        });
    }

    addNbFacture() {
        this.countFacture();
        this.depense = Number(localStorage.getItem("depense"));
        this.recette = Number(localStorage.getItem("recette"));
        this.nbFacture =
            this.depense +
            this.recette;
        
    }

    
    nbFacture: Number;
    
    affiche_facture : Number[] = [];

    
    date_1 = moment(new Date()).subtract(1, 'days').format("yyyy-MM-DD");
    date_2 = moment(new Date()).subtract(2, 'days').format("yyyy-MM-DD");
    date_3 = moment(new Date()).subtract(3, 'days').format("yyyy-MM-DD");
    date_4 = moment(new Date()).subtract(4, 'days').format("yyyy-MM-DD");
    date_5 = moment(new Date()).subtract(5, 'days').format("yyyy-MM-DD");
    date_6 = moment(new Date()).subtract(6, 'days').format("yyyy-MM-DD");


    date = [this.date_1, this.date_2, this.date_3, this.date_4, this.date_5, this.date_6]
    // getCountRecette(date){
    //     this.dashboardServie.countRecette(date).subscribe(
    //         response => {
    //             let set = JSON.stringify(response)
    //             localStorage.setItem("recette1", set)
    //         }
    //     )
    // }

    // getCountDepense(date){
    //     this.dashboardServie.countDepense(date).subscribe(
    //         response => {
    //             let set = JSON.stringify(response);
    //             localStorage.setItem("depense1", set)
    //         }
    //     )
    // }
    // getRecetteByDate(date){
    //     let recette
    //     let recette1
    //     this.dashboardServie.getRecetteByDate(date).subscribe(
    //         response => {
    //            recette = response  
    //             let recette1 = JSON.stringify(recette.length)
    //             localStorage.setItem("recette1", recette1)
    //             console.log(localStorage.getItem("recette1"))
                
    //         }
    //     )
    // }

    // getDepenseByDate(date){
    //     let depense
    //     let depense1
    //     return this.dashboardServie.getDepenseByDate(date).subscribe(
    //         response => {
    //             depense = response;
    //             let depense1 = JSON.stringify(depense.length)
    //             localStorage.setItem("depense1", depense1)
                
    //         }
    //     )
    // }


    
    // Facture_saisie_daily(){
    //     let i;
        
    //     for(i = 0; i< this.date.length; i++){
    //         this.dashboardServie.countDepense(this.date[i]).subscribe(
    //             response => {
    //                 let depense1 = response;
    //                 this.dashboardServie.countRecette(this.date[i]).subscribe(
    //                     response => {
    //                         let recette1 = response
    //                         console.log(recette1)
    //                         let total_facture = Number(depense1) + Number(recette1)
    //                         this.affiche_facture.push(total_facture)
    //                     }
    //                 )
    //             }
    //         )
    //     }
    //     console.log(this.affiche_facture)
    //     console.log(this.date)
    // }



    
    routerLink: string;
    logout() {
        localStorage.removeItem("admin");
        this.routerLink = "/mylogin";
        console.log(localStorage.getItem("admin"));
    }

   
}
