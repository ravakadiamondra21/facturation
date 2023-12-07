import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NewRecette } from './newRecette';
import { Recette } from './recette';
import { RecetteService } from './recette.service';

interface Statu{
  name: string;
}

interface Search{
  value: string;
}

@Component({
  selector: 'app-recette',
  templateUrl: './recette.component.html',
  styleUrls: ['./recette.component.scss', './recette.css']
})
export class RecetteComponent implements OnInit{
  status: Statu[] ;
  selectedStatu : Statu;
  valueToSearch: Search[];
  selectedValue: Search;

  constructor(private recetteService: RecetteService){
    this.status = [
      {name: 'banque'},
      {name: 'caisse'},
      {name: 'à definir'}
    ]

    this.valueToSearch = [
      {value: 'date facture'},
      {value: 'date opération'}
    ]
  }

  addNew : boolean = false;

  recetteForm = new FormGroup({
    date_operation : new FormControl(),
    date_facture: new FormControl(),
    client : new FormControl(''),
    description : new FormControl(''),
    statu : new FormControl(''),
    montant_HT : new FormControl(),
    TVA: new FormControl(),
    numero_facture: new FormControl()
  })
ngOnInit(){
  console.log(this.recette)
  return this.readRecette();

}

recette : Recette[] = [];
id = null


readRecette(){
  this.recetteService.getRecette().subscribe(
    response=>{
      this.recette = response;
    }
  )
}

newRecette: NewRecette = {
  date_operation: null,
  date_facture: null,
  client: "",
  description: "",
  montant_HT: 0,
  statu: "",
  admin : null,
  TVA: 0,
  numero_facture: 0,
  ref_lettrage: ""
}

searchForm = new FormGroup({
  search: new FormControl("")
})

postRecette(){
  let valueStorage = localStorage.getItem("admin")
  let objectValueStorage = JSON.parse(valueStorage)
  this.newRecette.date_facture =new Date(this.recetteForm.get('date_facture').value);
  this.newRecette.date_operation =new Date(this.recetteForm.get('date_operation').value);
  this.newRecette.client = this.recetteForm.get('client').value;
  this.newRecette.description = this.recetteForm.get('description').value;
  this.newRecette.montant_HT = Number(this.recetteForm.get('montant_HT').value);
  this.newRecette.TVA = Number(this.recetteForm.get('TVA').value);
  this.newRecette.statu = this.recetteForm.get('statu').value;
  this.newRecette.numero_facture = Number(this.recetteForm.get('numero_facture').value)
  this.newRecette.admin = Number(objectValueStorage.id);


  this.recetteService.postRecette(this.newRecette).subscribe(
    response=> {
      console.log(response)
      this.readRecette()
    }
  );
  this.readRecette();
  this.addNew= false;
  console.log('mande ny post')
}

openDialog(recette: any){
  this.addNew= true;
  
  this.recetteForm.setValue({
    date_operation: null,
    date_facture: null,
    client: "",
    description: "",
    montant_HT: 0,
    statu: "",
    TVA: 0,
    numero_facture: 0,
  })
}

hideDialog(){
  this.addNew = false;
  this.isEnable = false;
}

getRecette(){
  console.log(this.recetteForm.value);
}

selectedRow;
idToDelete;
isEnable = false;
onSelectedRow(recette: any){
  this.selectedRow = recette;
  this.idToDelete = Number(this.selectedRow.id);
  this.isEnable = true;
  console.log(this.selectedRow)
}

delete(){
  return this.recetteService.deleteRecette(this.idToDelete).subscribe(
    () =>{
      this.readRecette();
      this.isEnable = false;
      this.deleteDialog = false;
      this.addNew = false;
    }
  )
}

deleteDialog = false;

confirmDelete(){
  this.deleteDialog = true;
  this.isEnable = false;
}

getSearchValue(date){
  return date.target.value;
}

getByDate(date){
  var valueToSearch = this.getSearchValue(date);
  let value = this.searchForm.get('search').value;
  
  if(value == 'date facture'){
    this.recetteService.getFacture(new Date(valueToSearch)).subscribe(
      response => {
        this.recette = response;
        console.log("date facture")
        
      }
    )
  }
  else if(value == 'date opération'){
    this.recetteService.getOperation(new Date(valueToSearch)).subscribe(
      response => {
        this.recette = response;
        console.log("date operation")
      }
    )
  }
}

openEdit(recette: any){
  this.addNew = true;

  this.onSelectedRow(recette)
  this.selectedRow = recette;
  this.id = this.selectedRow.id;
  const Vdate_facture = new Date(this.selectedRow.date_facture)
  const Vdate_operation = new Date(this.selectedRow.date_operation)
  const Vclient = this.selectedRow.client;
  const Vdescription = this.selectedRow.description;
  const Vstatu = this.selectedRow.statu;
  const Vmontant_HT = this.selectedRow.montant_HT;
  const VTVA = this.selectedRow.TVA;
  const Vnumero_facture = this.selectedRow.numero_facture;

  this.recetteForm.setValue({
    date_facture: Vdate_facture,
    date_operation: Vdate_operation,
    client: Vclient,
    description: Vdescription,
    montant_HT: Vmontant_HT,
    statu: Vstatu,
    TVA: VTVA,
    numero_facture: Vnumero_facture
  })
  
}

editRecette(){
  let valueStorage = localStorage.getItem("admin")
  let objectValueStorage = JSON.parse(valueStorage)
  this.newRecette.date_facture =new Date(this.recetteForm.get('date_facture').value);
  this.newRecette.date_operation =new Date(this.recetteForm.get('date_operation').value);
  this.newRecette.client = this.recetteForm.get('client').value;
  this.newRecette.description = this.recetteForm.get('description').value;
  this.newRecette.montant_HT = Number(this.recetteForm.get('montant_HT').value);
  this.newRecette.TVA = Number(this.recetteForm.get('TVA').value);
  this.newRecette.statu = this.recetteForm.get('statu').value;
  this.newRecette.numero_facture = Number(this.recetteForm.get('numero_facture').value)
  this.newRecette.admin = Number(objectValueStorage.id);


  this.recetteService.updateRecette(this.id, this.newRecette).subscribe(
    response => {
      console.log('lasa ilay update');
      this.addNew = false;
      this.readRecette()
    }
  )
}


}
