import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { DepenseService } from './depense.service';
import { Depense } from './depense';
import { NewDepense } from './newDepense';
import { Observable, windowToggle } from 'rxjs';

interface Statu{
  name: string;
}

@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html',
  styleUrls: ['./depense.component.scss']
})


export class DepenseComponent implements OnInit {
  status: Statu[];
  selectedStatu : Statu;
  
  constructor(private depenseService: DepenseService){ 
    this.status= [
      {name: 'banque'},
      {name: 'caisse'},
      {name: 'à definir'}
    ]
  }
  

   addNewD = false;

   depenseForm = new FormGroup({
     date: new FormControl(),
     type: new FormControl(''),
     fournisseur: new FormControl(''),
     description : new FormControl(''),
     montant: new FormControl(),
     statu: new FormControl('')
   })

ngOnInit(): void{
  return this.readDepense();
}

depense : Depense[] = [];

readDepense(){
  this.depenseService.getDepense().subscribe(
    response=>{
      this.depense = response;
    }
  )
}

openDialog(){
  this.addNewD = true;
  this.id = null;
  this.depenseForm.setValue({
    date : null ,
    type: '',
    fournisseur: '',
    description: '',
    montant : 0,
    statu : ''

  })
}

hideDialog(){
  this.addNewD = false;
  this.isEnable = false;
}


newDepense: NewDepense = {
    date: null,
    type: "",
    fournisseur: "",
    description: "",
    montant: 0,
    statu: "",
    admin: 0,
    isValidate: false

};
postDepense(){
  this.id = null
  let valueStorage = localStorage.getItem("admin");
  let objectValueStorage = JSON.parse(valueStorage);
  this.newDepense.date =new Date(this.depenseForm.get('date').value);
  this.newDepense.type = this.depenseForm.get('type').value;
  this.newDepense.fournisseur = this.depenseForm.get('fournisseur').value;
  this.newDepense.description = this.depenseForm.get('description').value;
  this.newDepense.montant = Number(this.depenseForm.get('montant').value);
  this.newDepense.statu = this.depenseForm.get('statu').value;
  this.newDepense.admin = Number(objectValueStorage.id);
  this.newDepense.isValidate = false;

  this.depenseService.postDepense(this.newDepense)
  .subscribe(response =>{
    console.log(response)
    this.readDepense()

  })
  this.addNewD = false;
}

isEnable = false;
selectedRow;
idToDelete : number;
onRowSelected(depense: any){
  this.selectedRow = depense;
  this.idToDelete = Number(this.selectedRow.id)
  this.isEnable = true;
  
}

delete(){
  return this.depenseService.deleteDepense(this.idToDelete).subscribe(
    () => {
      this.readDepense()
      this.isEnable = false;
      this.deleteDialog = false
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
  var dateToSearch = this.getSearchValue(date);
  this.depenseService.getByDate(dateToSearch).subscribe(
    response => {
      this.depense = response;
    }
  )
}

id = null;

openEdit(depense: any){
  console.log("ity openEdit fa misokatra")

  this.addNewD = true;
  this.selectedRow = depense;
  this.id = this.selectedRow.id;
  const Vdate =new Date(this.selectedRow.date);
  const Vtype = this.selectedRow.type;
  const Vfournisseur = this.selectedRow.fournisseur;
  const Vdescription = this.selectedRow.description;
  const Vstatu = this.selectedRow.statu;
  const Vmontant = this.selectedRow.montant

  console.log(Vmontant)
  this.depenseForm.setValue({
    date : Vdate,
    description: Vdescription,
    fournisseur: Vfournisseur,
    montant : Vmontant,
    statu : Vstatu,
    type: Vtype
  })

}

editDepense(){
  const id = null;
  let valueStorage = localStorage.getItem("admin");
  let objectValueStorage = JSON.parse(valueStorage)

  this.newDepense.date = new Date(this.depenseForm.get('date').value);
  this.newDepense.description = this.depenseForm.get('description').value;
  this.newDepense.fournisseur = this.depenseForm.get('fournisseur').value;
  this.newDepense.montant = Number(this.depenseForm.get('montant').value);
  this.newDepense.statu = this.depenseForm.get('statu').value;
  this.newDepense.type = this.depenseForm.get('type').value;
  this.newDepense.admin = Number(objectValueStorage.id)
  
  return this.depenseService.updateDepense(this.id, this.newDepense).subscribe(
    response => {
      this.addNewD = false;
      this.readDepense()
      this.isEnable = false;

    }
  )
}
}
