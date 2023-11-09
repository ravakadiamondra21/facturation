import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NewRecette } from './newRecette';
import { Recette } from './recette';
import { RecetteService } from './recette.service';

interface Statu{
  name: string;
}

@Component({
  selector: 'app-recette',
  templateUrl: './recette.component.html',
  styleUrls: ['./recette.component.scss', './recette.css']
})
export class RecetteComponent implements OnInit{
  status: Statu[] ;
  selectedStatu : Statu;

  constructor(private recetteService: RecetteService){
    this.status = [
      {name: 'banque'},
      {name: 'caisse'},
      {name: 'à definir'}
    ]
  }

  addNew : boolean = false;

  recetteForm = new FormGroup({
    date : new FormControl(),
    client : new FormControl(''),
    description : new FormControl(''),
    statu : new FormControl(''),
    montant : new FormControl(),
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
  date: null,
  client: "",
  description: "",
  montant: 0,
  statu: "",
  admin : null,
  isValidate: false
}

postRecette(){
  let valueStorage = localStorage.getItem("admin")
  let objectValueStorage = JSON.parse(valueStorage)
  this.newRecette.date =new Date(this.recetteForm.get('date').value);
  this.newRecette.client = this.recetteForm.get('client').value;
  this.newRecette.description = this.recetteForm.get('description').value;
  this.newRecette.montant = Number(this.recetteForm.get('montant').value);
  this.newRecette.statu = this.recetteForm.get('statu').value;
  this.newRecette.admin = Number(objectValueStorage.id);
  this.newRecette.isValidate = false;

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

openDialog(){
  this.addNew= true;
  this.recetteForm.setValue({
    date: null,
    client: '',
    description: '',
    montant: 0,
    statu: ''
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
  var dateToSearch = this.getSearchValue(date)
  this.recetteService.getByDate(dateToSearch).subscribe(
    response => {
      this.recette = response;
      console.log(this.recette)
      //return this.readRecette();
    }
  )
}

openEdit(recette: any){
  this.addNew = true;
  this.selectedRow = recette;
  this.id = this.selectedRow.id;
  const Vdate = new Date(this.selectedRow.date)
  const Vclient = this.selectedRow.client;
  const Vdescription = this.selectedRow.description;
  const Vstatu = this.selectedRow.statu;
  const Vmontant = this.selectedRow.montant;

  this.recetteForm.setValue({
    date: Vdate,
    client: Vclient,
    description: Vdescription,
    montant: Vmontant,
    statu: Vstatu
  })
  
}

editRecette(){
  this.newRecette.date =new Date(this.recetteForm.get('date').value);
  this.newRecette.client = this.recetteForm.get('client').value;
  this.newRecette.description = this.recetteForm.get('description').value;
  this.newRecette.montant = Number(this.recetteForm.get('montant').value);
  this.newRecette.statu = this.recetteForm.get('statu').value;

  this.recetteService.updateRecette(this.id, this.newRecette).subscribe(
    response => {
      console.log('lasa ilay update');
      this.addNew = false;
      this.readRecette()
    }
  )
}


}
