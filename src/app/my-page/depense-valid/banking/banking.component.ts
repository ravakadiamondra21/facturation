import { Component, OnInit } from "@angular/core";
import * as XLSX from "xlsx";
import { DepenseService } from "../../depense/depense.service";
import { Banking } from "./banking";
import { BankingService } from "./banking.service";
import { DatePipe, formatDate } from "@angular/common";
import { NewBanking } from "./newBanking";
import { NewDepense } from "../../depense/newDepense";
import { RecetteService } from "../../recette/recette.service";
import { Recette } from "../../recette/recette";
import { NewRecette } from "../../recette/newRecette";
import { RelationDepense } from "./relation_depense";
import { RelationRecette } from "./relation_recette";
import { FormControl, FormControlName, FormGroup } from "@angular/forms";

interface Search{
    value: string;
}

@Component({
    selector: "app-banking",
    templateUrl: "./banking.component.html",
    styleUrls: ["./banking.component.scss"],
})
export class BankingComponent implements OnInit {
    valueToSearch : Search[];
    selectedValue: Search;
    constructor(
        private bankingService: BankingService,
        private depenseService: DepenseService,
        private recetteService: RecetteService,
        private datePipe: DatePipe
    ) {
        this.valueToSearch = [
            {value: 'date opération'},
            {value: 'libellé'}
        ]
    }

    searchForm = new FormGroup({
        value : new FormControl("")
    })

    routerLink;

    ngOnInit() {
        return this.findNotMatched();
    }

    onFileChange(evt: any) {
        const target: DataTransfer = <DataTransfer>evt.target;

        if (target.files.length > 1) {
            alert("des fichiers multiples ne sont pas autorisés");
            return;
        } else {
            const reader: FileReader = new FileReader();
            let banque: NewBanking[] = [];
            reader.onload = (e: any) => {
                const bstr: string = e.target.result;
                const wb: XLSX.WorkBook = XLSX.read(bstr, { type: "binary" });

                const worksheetname = wb.SheetNames[0];
                const worksheet: XLSX.WorkSheet = wb.Sheets[worksheetname];

                let data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                for (let i = 1; i < data.length; i++) {
                    let one_banking: NewBanking = {
                        
                        credit: 0,
                        date_operation: null,
                        debit: 0,
                        libelle: "",
                        solde: 0,
                    };

                    one_banking.date_operation = new Date(data[i][0]);
                    one_banking.libelle = data[i][1];
                    one_banking.debit = Number(data[i][2]);
                    one_banking.credit = Number(data[i][3]);
                    one_banking.solde = Number(data[i][4]);

                    banque.push(one_banking);
                }

                this.bankingService.saveBanking(banque).subscribe(
                    response => {
                        this.findNotMatched();
                    }
                );
            };

            reader.readAsBinaryString(target.files[0]);
        }
        
    }

    banking: Banking[] = [];

    findNotMatched() {
        return this.bankingService.findNotMatched().subscribe((response) => {
            this.banking = response;
        });
    }

    selectedRow: Banking;
    date;
    libelle;
    debit;
    credit;

    onSelectedRow(banking: Banking) {
        this.depense = [];
        this.isSelected = [];
        console.log(this.depense);
        this.selectedRow = banking;
        this.date = new Date(this.selectedRow.date_operation);
        this.libelle = this.selectedRow.libelle;
        this.debit = Number(this.selectedRow.debit);
        this.credit = Number(this.selectedRow.credit);
        this.visibleSidebar = true;
        console.log(this.selectedRow);
        this.openMatching();
        console.log(this.date);
        if (this.debit == 0 && this.credit != 0) {
            this.selectDepenseForMatching(this.datePipe.transform(this.selectedRow.date_operation, 'yyyy-MM-dd'));
        } else {
            this.selectRecetteForMatching(this.datePipe.transform(this.selectedRow.date_operation, 'yyyy-MM-dd'));
        }
    }

    visibleSidebar = false;
    openMatching() {}

    depense: any[] = [];
    recette: Recette[] = [];

    selectDepenseForMatching(date: string) {

        return this.depenseService.getByDate(date).subscribe((response) => {
            this.depense = response;
            console.log(this.depense);
        });
    }

    montant;
    selectRecetteForMatching(date: string) {
        return this.recetteService.getByDate(date).subscribe((response) => {
            this.depense = response;
            console.log(this.depense);
        });
    }

    selectRecetteForM;

    valueToMatch: RelationDepense = {
        banque: 0,
        depense: 0,
        ref_lettrage: ""
    };

    newRecette: RelationRecette = {
        banque: 0,
        recette: 0,
        ref_lettrage: ""
    };

    one_banking: NewBanking = {
        credit: 0,
        date_operation: null,
        debit: 0,
        libelle: "",
        solde: 0,
    };

    isSelected: any[] = [];
    change_color(item) {
        const index = this.isSelected.indexOf(item);

        if (index !== -1) {
            this.isSelected.splice(index, 1);
        } else {
            this.isSelected.push(item);
        }
    }

    functionSelect(item: any): boolean {
        return this.isSelected.includes(item);
    }

    dialog = false;

    callMatchDepense() {
        let banque;
        this.depenseService.countByRef("B").subscribe((response) => {
            let nbD = Number(response);
            this.recetteService.countByRef("B").subscribe(
                response => {
                    let nbR = Number(response);
                    let nb = nbD + nbR
                    let NB = Number(nb + 1);
                    banque = "B" + NB;

                    if (this.isSelected.length == 0) {
                        this.dialog = true;
                    } else {
                        this.matchDepense(banque);
                    }
                }
            )
           
        });
        // this.visibleSidebar = false;
        this.findNotMatched()
    }

    matchDepense(banque: string) {
        this.isSelected.forEach((item) => {
            if (item.statu == "banque") {

                this.valueToMatch.banque = this.selectedRow.id_banque
                this.valueToMatch.depense = item.id_depense
                this.valueToMatch.ref_lettrage = banque;

                this.bankingService.saveRelationDepense(this.valueToMatch).subscribe()
                this.routerLink = '/main/banque'
                console.log("match depense")
                
            }
        });
        this.visibleSidebar = false;
        
    }

    callMatchRecette() {
        let caisse;
        let banque;

        this.depenseService.countByRef("C").subscribe((response) => {
            let nbC_depense = Number(response);
            this.recetteService.countByRef("C").subscribe(
                response => {
                    let nbC_recette = Number(response)
                    let NBC = nbC_depense + nbC_recette
                    let nbC = NBC + 1
                    caisse = "C" + nbC

                    this.depenseService.countByRef("B").subscribe((response) => {
                        let nbB_depense = Number(response);
                        this.recetteService.countByRef("B").subscribe(
                            response => {
                                let nbB_recette = Number(response)
                                let NBB = nbB_depense + nbB_recette
                                let nbB = NBB + 1

                                banque = "B" + nbB

                                this.matchRecette(caisse, banque)
                            }
                        )
                    }
                    )
                }
            )
        }

        )
        this.findNotMatched()
    }


    matchRecette(caisse: string, banque: string) {
        this.isSelected.forEach((item) => {
            if (item.statu == "caisse") {
                this.newRecette.banque = this.selectedRow.id_banque
                this.newRecette.recette = item.id_recette
                this.newRecette.ref_lettrage = caisse
                this.recetteService.saveRelationRecette(this.newRecette).subscribe();
                console.log("ity zai caisse recette")
                
            } else if (item.statu == "banque") {
                this.newRecette.banque = this.selectedRow.id_banque
                this.newRecette.recette = item.id_recette
                this.newRecette.ref_lettrage = banque
                this.recetteService.saveRelationRecette(this.newRecette).subscribe();
                console.log("ity zao banque recette")
                    
            }
        });
        this.visibleSidebar = false;
        this.routerLink = '/main/banque'
        console.log("match recette")
    }

    approv : NewRecette = {
        TVA:0,
        admin: 0,
        client: "",
        date_facture: null,
        date_operation: null,
        description: "",
        montant_HT:0,
        numero_facture: 0,
        statu: "caisse"
    }

    insertCaisse(caisse) {
        let admin = localStorage.getItem("admin");
        let adminObject = JSON.parse(admin);

        this.approv.date_operation = new Date(
            this.selectedRow.date_operation
        );
        this.approv.description = this.selectedRow.libelle;
        this.approv.montant_HT = this.selectedRow.credit;
        this.approv.admin = Number(adminObject.id);
        this.approv.statu = "caisse";

        this.newRecette.banque = this.selectedRow.id_banque
        this.newRecette.ref_lettrage = caisse

        this.recetteService.postRecette(this.approv).subscribe()
        this.recetteService.getLastId().subscribe(
            response => {
                this.newRecette.recette = Number(response)
                this.recetteService.saveRelationRecette(this.newRecette).subscribe()
                this.routerLink = '/main/banque'
                console.log("insert caisse")
            }
        )

    }

    newDepense: NewDepense = {
        date_operation: null,
        date_facture: null,
        type: "",
        fournisseur: "",
        description: "",
        montant_HT: 0,
        statu: "",
        admin: 0,
        TVA: 0,
        circuit: "",
        numero_facture: 0
    };

    insertBanque() {
        let admin = localStorage.getItem("admin");
        let adminObject = JSON.parse(admin);

        this.newDepense.admin = Number(adminObject.id);
        this.newDepense.date_operation = new Date(
            this.selectedRow.date_operation
        );
        this.newDepense.description = this.selectedRow.libelle;
        this.newDepense.montant_HT = Number(this.selectedRow.credit);
        this.newDepense.statu = "banque";


        this.depenseService.postDepense(this.newDepense).subscribe();
    }

    yesClick() {
        let caisse;
        if (this.dialog === true) {
            this.depenseService.countByRef("C").subscribe((response) => {
                let nbD = Number(response);

               this.recetteService.countByRef("C").subscribe(
                   response => {
                    let nbR = Number(response)
                    
                    let nb = nbD + nbR + 1
                    caisse = "C" + nb
                    this.insertBanque();
                    this.insertCaisse(caisse)
                    
                   }
               )
                this.dialog = false;
            });
        }
        this.visibleSidebar = false;
        this.findNotMatched()
        console.log("yes")
        this.routerLink = '/main/banque'
        console.log("yes valid")
    }

    getSearchValue(event){
        return event.target.value;
      }
    
      search(event){
        var valueToSearch = this.getSearchValue(event)
        let value = this.searchForm.get('value').value;
        console.log(value)
        if(value == 'date opération'){
            this.bankingService.searchDateOperation(valueToSearch).subscribe(
                response => {
                    this.banking = response
                    
                }
            )
        }
        else if(value == "libellé"){
            this.bankingService.searchLibelle(valueToSearch).subscribe(
                response => {
                    this.banking = response
                    console.log(value)
                }
            )
        }
    }
}
