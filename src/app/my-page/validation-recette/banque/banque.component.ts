import { Component, OnInit } from '@angular/core';
import { NewRecette } from '../../recette/newRecette';
import { Recette } from '../../recette/recette';
import { Solde } from '../../solde';
import { BanqueService } from './banque.service';

@Component({
  selector: 'app-banque',
  templateUrl: './banque.component.html',
  styleUrls: ['./banque.component.scss']
})
export class BanqueComponent implements OnInit{
  constructor(private banqueService : BanqueService){}

  recette: Recette[] = []

  ngOnInit(){
    return this.getNotValide()
  }

  getNotValide(){
    this.banqueService.getNotValidate().subscribe(
      response => {
        this.recette = response
      }
    )
  }

  validation = false;
  selectedRow;
  
  valueToValide : NewRecette = {
    date: null,
  client: "",
  description: "",
  montant: 0,
  statu: "",
  admin : null,
  isValidate: false
  }
  admin;

  onSelectedRow(recette: any){
    this.validation = true;
    this.selectedRow = recette;
    this.valueToValide.date = new Date(this.selectedRow.date);
    this.valueToValide.client = this.selectedRow.client;
    this.valueToValide.description = this.selectedRow.description;
    this.valueToValide.montant = Number(this.selectedRow.montant);
    this.valueToValide.statu = this.selectedRow.statu;
    this.admin = this.selectedRow.admin.nom + ' ' + this.selectedRow.admin.prenom;
  }

  confirm = false
  onValide(){
    this.valueToValide.admin = Number(this.selectedRow.admin.id);
    this.valueToValide.isValidate = true;
    console.log("lasa any ny update")
    return this.banqueService.updateValidation(Number(this.selectedRow.id), this.valueToValide).subscribe(
      response => {
        this.validation = false;
        this.confirm = false;
        this.getNotValide();
        this.getSolde()
      }
    )
  }

  soldeEnBanque: Solde = {
    nom : "Banque",
    somme : 0
};

getSolde(){
    return this.banqueService.getSolde().subscribe(
        response => {
            this.soldeEnBanque.somme = Number(response.somme);
            this.updateSolde()
        }
    )
}

updateSolde(){
  console.log(this.valueToValide.montant)
    this.soldeEnBanque.somme = this.soldeEnBanque.somme + this.valueToValide.montant;
    return this.banqueService.updateSolde(this.soldeEnBanque.nom, this.soldeEnBanque).subscribe(
        response => {
            console.log("niova ny solde")
        }
    )
}
}
