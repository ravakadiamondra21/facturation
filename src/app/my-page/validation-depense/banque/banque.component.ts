import { Component, OnInit } from "@angular/core";
import { Depense } from "../../depense/depense";
import { NewDepense } from "../../depense/newDepense";
import { Solde } from "../../solde";
import { BanqueService } from "./banque.service";

@Component({
    selector: "app-banque",
    templateUrl: "./banque.component.html",
    styleUrls: ["./banque.component.scss"],
})
export class BanqueComponent implements OnInit {
    depense: Depense[] = [];
    constructor(private banqueService: BanqueService) {}

    validation = false;
    ngOnInit() {
         this.getNotValidate();
         this.getSolde()
    }

    getNotValidate() {
        this.banqueService.getNotValidate().subscribe((response) => {
            this.depense = response;
        });
    }

    toValide: Depense;
    selectedRow;
    admin;
    onSelectedRow(depense: any) {
        this.selectedRow = depense;

        this.newDepense.date = new Date(this.selectedRow.date);
        this.newDepense.description = this.selectedRow.description;
        this.newDepense.fournisseur = this.selectedRow.fournisseur;
        this.newDepense.type = this.selectedRow.type;
        this.newDepense.statu = this.selectedRow.statu;
        this.newDepense.montant = Number(this.selectedRow.montant);
        this.admin = this.selectedRow.admin.nom + " " + this.selectedRow.admin.prenom;
    }

    newDepense: NewDepense = {
        date: null,
        type: "",
        fournisseur: "",
        description: "",
        montant: 0,
        statu: "",
        admin: 0,
        isValidate: false,
    };
    confirm = false;
    onValidate() {
      this.newDepense.admin = this.selectedRow.admin.id;
      this.newDepense.isValidate = true;
        return this.banqueService.updateDepense(this.selectedRow.id, this.newDepense).subscribe(
          (response) => {
                this.validation = false;
                this.confirm = false;
                this.getNotValidate();
                this.getSolde();
                
            });

    }

    soldeEnBanque: Solde = {
        nom : "Banque",
        somme : 0
    };

    getSolde(){
        return this.banqueService.getSolde().subscribe(
            response => {
                this.soldeEnBanque.somme = Number(response.somme);
                console.log(this.soldeEnBanque);
                this.updateSolde();
            }
        )
    }

    updateSolde(){
        this.soldeEnBanque.somme = this.soldeEnBanque.somme - this.newDepense.montant;
        return this.banqueService.updateSolde(this.soldeEnBanque.nom, this.soldeEnBanque).subscribe(
            response => {
                console.log("niova ny solde")
            }
        )
    }
}
