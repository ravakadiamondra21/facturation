import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Depense } from '../../depense/depense';
import { NewDepense } from '../../depense/newDepense';
import { AutreService } from './autre.service';

@Component({
  selector: 'app-autre',
  templateUrl: './autre.component.html',
  styleUrls: ['./autre.component.scss']
})
export class AutreComponent implements OnInit{
  constructor(private autreService: AutreService){

  }

  ngOnInit(){
    return this.getNotValidate()
  }

  depense : Depense[] = [];

  getNotValidate(){
    return this.autreService.getNotValidate().subscribe(
      response => {
        this.depense = response;
      }
    )
  }

  // validation = false;
  // selectedRow;
  // valueToValide : NewDepense = {
  //   date: null,
  //       type: "",
  //       fournisseur: "",
  //       description: "",
  //       montant: 0,
  //       statu: "",
  //       admin: 0,
  //       isValidate: false,
  //       numero_paiement : 0
  // }

  // admin;

  // onSelectedRow(depense: any){
  //   this.selectedRow = depense;

  //   this.valueToValide.date = new Date(this.selectedRow.date);
  //   this.valueToValide.type = this.selectedRow.type;
  //   this.valueToValide.fournisseur = this.selectedRow.fournisseur;
  //   this.valueToValide.description = this.selectedRow.description;
  //   this.valueToValide.admin = this.selectedRow.admin.id;

  //   this.admin = this.selectedRow.admin.nom + this.selectedRow.admin.prenom
  // }

  // confirm = false;
  // numero_paiement = 0;

  // onValidate(){
  //   // this.valueToValide.statu = this.statuForm.get('statu').value;
  //   this.valueToValide.isValidate = true;
  //   this.valueToValide.numero_paiement = Number(this.numero_paiement)

  //   return this.autreService.updateValidation(this.selectedRow.id, this.valueToValide).subscribe(
  //     response => {
  //       this.confirm = false;
  //       this.validation = false;
  //       this.getNotValidate()
  //     }
  //   )
  // }
}
