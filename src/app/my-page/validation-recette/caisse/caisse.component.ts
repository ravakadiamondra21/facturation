import { Component, OnInit } from '@angular/core';
import { NewRecette } from '../../recette/newRecette';
import { Recette } from '../../recette/recette';
import { Solde } from '../../solde';
import { CaisseService } from './caisse.service';


@Component({
  selector: 'app-caisse',
  templateUrl: './caisse.component.html',
  styleUrls: ['./caisse.component.scss']
})
export class CaisseComponent implements OnInit{
  constructor(private caisseService: CaisseService){}

  recette: Recette[] = [];

  ngOnInit(){
    return this.getNotValide()
  }
  getNotValide(){
    this.caisseService.getNotValidate().subscribe(
      response => {
        this.recette = response;
      }
    )
  }

  valueToValidate : NewRecette = {
    date: null,
  client: "",
  description: "",
  montant: 0,
  statu: "",
  admin : null,
  isValidate: false
  }

  validation = false;
  selectedRow;
  admin;
  onSelectedRow(recette : any){
    this.selectedRow = recette;

    this.valueToValidate.date = new Date(this.selectedRow.date);
    this.valueToValidate.client = this.selectedRow.client;
    this.valueToValidate.description = this.selectedRow.description;
    this.valueToValidate.montant = Number(this.selectedRow.montant);
    this.valueToValidate.statu = this.selectedRow.statu;
    this.valueToValidate.admin = Number(this.selectedRow.admin.id);
    this.admin = this.selectedRow.admin.nom + ' ' + this.selectedRow.admin.prenom;
  }

  confirm = false;
  onValide(){
    this.valueToValidate.isValidate = true;

    return this.caisseService.updateValidation(this.selectedRow.id, this.valueToValidate).subscribe(
      response => {
        this.confirm = false;
        this.validation = false;
        this.getNotValide();
        this.getSolde()
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
    this.soldeEnCaisse.somme = this.soldeEnCaisse.somme + this.valueToValidate.montant;

    return this.caisseService.updateSolde(this.soldeEnCaisse.nom, this.soldeEnCaisse).subscribe(
      response => {
        console.log("niova ko ity")
      }
    )
  }
}
