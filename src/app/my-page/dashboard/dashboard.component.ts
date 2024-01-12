import { Component, OnInit } from "@angular/core";
import { DashboardService } from "./dashboard.service";
import * as moment from 'moment';
import { DatePipe } from "@angular/common";

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
        private datePipe : DatePipe
    ) {
    }

    ordersChart: any;

    ordersOptions: any;

    ngOnInit() {
        this.showValue()
        this.ordersChart = {
            labels: [
                this.datePipe.transform(this.mois_9, 'MMMM'),
                this.datePipe.transform(this.mois_8, 'MMMM'),
                this.datePipe.transform(this.mois_7, 'MMMM'),
                this.datePipe.transform(this.mois_6, 'MMMM'),
                this.datePipe.transform(this.mois_5, 'MMMM'),
                this.datePipe.transform(this.mois_4, 'MMMM'),
                this.datePipe.transform(this.mois_3, 'MMMM'),
                this.datePipe.transform(this.mois_2, 'MMMM'),
                this.datePipe.transform(this.mois_1, 'MMMM')
            ],
            datasets: [
                {
                    label: "Recette",
                    data: [ this.recetteByMonth[8],
                            this.recetteByMonth[7], 
                            this.recetteByMonth[6],
                            this.recetteByMonth[5], 
                            this.recetteByMonth[4],
                            this.recetteByMonth[3], 
                            this.recetteByMonth[2], 
                            this.recetteByMonth[1], 
                            this.recetteByMonth[0]
                ],
                    borderColor: ["#f1b263"],
                    backgroundColor: ["rgba(241, 178, 99, 0.1)"],
                    borderWidth: 2,
                    fill: true,
                    borderDash: [3, 6],
                    tension: 0.4,
                },
                {
                    label: "Dépense",
                    data: [ this.depenseByMonth[8],
                            this.depenseByMonth[7],
                            this.depenseByMonth[6],
                            this.depenseByMonth[5],
                            this.depenseByMonth[4],
                            this.depenseByMonth[3],
                            this.depenseByMonth[2],
                            this.depenseByMonth[1],
                            this.depenseByMonth[0]
                ],
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
    
    depenseByDate : number[];
    recetteByDate : number[];
    factureByDate : number[];
    bankingByDate : number[];

    recetteByMonth : number[];
    depenseByMonth : number[];
    
    date_1 = moment(new Date()).subtract(1, 'days').format("yyyy-MM-DD");
    date_2 = moment(new Date()).subtract(2, 'days').format("yyyy-MM-DD");
    date_3 = moment(new Date()).subtract(3, 'days').format("yyyy-MM-DD");
    date_4 = moment(new Date()).subtract(4, 'days').format("yyyy-MM-DD");
    date_5 = moment(new Date()).subtract(5, 'days').format("yyyy-MM-DD");
    date_6 = moment(new Date()).subtract(6, 'days').format("yyyy-MM-DD");

    mois_1= moment(new Date()).subtract(0, 'month').format("yyyy-MM");
    mois_2= moment(new Date()).subtract(1, 'month').format("yyyy-MM");
    mois_3= moment(new Date()).subtract(2, 'month').format("yyyy-MM");
    mois_4= moment(new Date()).subtract(3, 'month').format("yyyy-MM");
    mois_5= moment(new Date()).subtract(4, 'month').format("yyyy-MM");
    mois_6= moment(new Date()).subtract(5, 'month').format("yyyy-MM");
    mois_7= moment(new Date()).subtract(6, 'month').format("yyyy-MM");
    mois_8= moment(new Date()).subtract(7, 'month').format("yyyy-MM");
    mois_9= moment(new Date()).subtract(8, 'month').format("yyyy-MM");

    mois = [this.mois_1, this.mois_2, this.mois_3, this.mois_4, this.mois_5, this.mois_6, this.mois_7, this.mois_8, this.mois_9]

    date = [this.date_1, this.date_2, this.date_3, this.date_4, this.date_5, this.date_6]
    countRecette;
    countDepense;
    countBanking;
    getCountRecette(){
        this.dashboardServie.countRecette().subscribe(
            response => {
                // let set = JSON.stringify(response)
                // localStorage.setItem("recette1", set)
                this.countRecette = Number(response)
            }
        )
    }

    getCountDepense(){
        this.dashboardServie.countDepense().subscribe(
            response => {
                // let set = JSON.stringify(response);
                // localStorage.setItem("depense1", set)
                this.countDepense = Number(response)
            }
        )
    }

    showValue(){
        this.getCountRecette();
        this.getCountDepense();
        this.getCountBanking();
        this.countDepenseByDate();
        this.countRecetteByDate();
        this.countBankingByDate();
        this.countDepenseByMonth();
        this.countRecetteByMonth()
    }

    getCountBanking(){
        this.dashboardServie.countBanking().subscribe(
            response => {
                this.countBanking = response;
            }
        )
    }

    countDepenseByDate(){
        this.depenseByDate = []
        for(let i=0; i< this.date.length; i++){
            this.dashboardServie.countDepenseByDate(this.date[i]).subscribe(
                response => {
                    this.depenseByDate.push(Number(response))
                }
            )
        }
        
    }

    countRecetteByDate(){
        this.recetteByDate = []
        for(let i=0; i<this.date.length; i++){
            this.dashboardServie.countRecetteByDate(this.date[i]).subscribe(
                response => {
                    this.recetteByDate.push(Number(response))
                }
            )
        }
        console.log(this.depenseByDate)
        
    }

    countBankingByDate(){
        this.bankingByDate = []
        for(let i=0; i<this.date.length; i++){
            this.dashboardServie.countBankingByDate(this.date[i]).subscribe(
                response => {
                    let nb = Object.keys(response).length
                    this.bankingByDate.push(nb)
                    console.log(this.bankingByDate[i])
                }
            )
        }
    }

    countRecetteByMonth(){
        this.recetteByMonth = [];
        for(let i=0; i<this.mois.length; i++){
            this.dashboardServie.countRecetteByMonth(this.mois[i]).subscribe(
                response => {
                    let nb = Object.keys(response).length
                    this.recetteByMonth.push(nb)
                }
            )
        }
    }

    countDepenseByMonth(){
        this.depenseByMonth = [];
        for(let i=0; i<this.mois.length; i++){
            this.dashboardServie.countDepenseByMonth(this.mois[i]).subscribe(
                response => {
                    let nb = Object.keys(response).length
                    this.depenseByMonth.push(nb)
                    console.log(this.depenseByMonth[i])
                    console.log(this.mois[i])
                }
            )
        }
    }

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


   
}
