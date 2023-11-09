import { Component, OnInit } from '@angular/core';
import { Depense } from '../../depense/depense';
import { NewDepense } from '../../depense/newDepense';
import { Solde } from '../../solde';
import { CaisseService } from './caisse.service';

@Component({
  selector: 'app-caisse',
  templateUrl: './caisse.component.html',
  styleUrls: ['./caisse.component.scss']
})
export class CaisseComponent implements OnInit{
  constructor(private caisseService : CaisseService){}

  depense : Depense[] = [];

  ngOnInit(){
    return this.getNotValidate()
  }
  getNotValidate(){
    this.caisseService.getNotValidate().subscribe(
      response => {
        this.depense = response;
      }
    )
  }

  validation = false;
  selectedRow;
  
  valueToValide: NewDepense = {
    date: null,
    type: "",
    fournisseur: "",
    description: "",
    montant: 0,
    statu: "",
    admin: 0,
    isValidate: false
  }
  admin;
  onSelectedRow(depense: any){
    this.selectedRow = depense;
    this.valueToValide.date = new Date(this.selectedRow.date);
    this.valueToValide.type = this.selectedRow.type;
    this.valueToValide.fournisseur = this.selectedRow.fournisseur;
    this.valueToValide.description = this.selectedRow.description;
    this.valueToValide.montant = this.selectedRow.montant;
    this.valueToValide.statu = this.selectedRow.statu;
    this.valueToValide.admin = this.selectedRow.admin.id;
    this.admin = this.selectedRow.admin.nom + ' ' + this.selectedRow.admin.prenom
  }

  confirm = false;

  onValide(){
    this.valueToValide.isValidate = true;
    return this.caisseService.updateValidation(this.selectedRow.id, this.valueToValide).subscribe(
      response => {
        this.confirm = false;
        this.validation = false;
        this.getNotValidate();
        this.getSolde();
        
      }
    )
  }

  soldeEnCaisse : Solde = {
    nom: "Caisse",
    somme : 0
  }

  getSolde(){
    return this.caisseService.getSolde().subscribe(
      response => {
        this.soldeEnCaisse.somme = Number(response.somme)
        this.updateSolde()
      }
    )
  }

  updateSolde(){
    console.log(this.soldeEnCaisse.somme)
    this.soldeEnCaisse.somme = this.soldeEnCaisse.somme - this.valueToValide.montant;

    return this.caisseService.updateSolde(this.soldeEnCaisse.nom, this.soldeEnCaisse).subscribe(
      response => {
        console.log("niova ko ity")
      }
    )
  }
}
