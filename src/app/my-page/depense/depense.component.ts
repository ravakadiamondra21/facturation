import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { DepenseService } from './depense.service';
import { Depense } from './depense';
import { NewDepense } from './newDepense';


interface Statu{
  name: string;
}

interface Search{
  value: string;
}

@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html',
  styleUrls: ['./depense.component.scss']
})

export class DepenseComponent implements OnInit {
  status: Statu[];
  selectedStatu : Statu;
  valueToSearch: Search[];
  selectedValue: Search;
  
  constructor(private depenseService: DepenseService){ 
    this.status= [
      {name: 'banque'},
      {name: 'caisse'},
      {name: 'à definir'}
    ]

    this.valueToSearch = [
      {value: 'date facture'},
      {value: 'date opération'},
      {value: 'circuit'}
    ]
  }
  

   addNewD = false;

   depenseForm = new FormGroup({
     date_operation: new FormControl(),
     date_facture: new FormControl(),
     numero_facture: new FormControl(),
     circuit: new FormControl(''),
     type: new FormControl(''),
     fournisseur: new FormControl(''),
     description : new FormControl(''),
     montant_HT: new FormControl(),
     TVA: new FormControl(),
     statu: new FormControl('')
   })

   searchForm = new FormGroup({
     search: new FormControl("")
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
    date_operation : null ,
    date_facture : null,
    type: '',
    fournisseur: '',
    description: '',
    montant_HT : 0,
    statu : '',
    TVA: 0,
    circuit: '',
    numero_facture: 0

  })
}

hideDialog(){
  this.addNewD = false;
  this.isEnable = false;
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
    isValidate: false,
    TVA: 0,
    circuit: '',
    numero_facture: 0,
    ref_lettrage: ''
};
postDepense(){
  this.id = null
  let valueStorage = localStorage.getItem("admin");
  let objectValueStorage = JSON.parse(valueStorage);
  this.newDepense.date_operation =new Date(this.depenseForm.get('date_operation').value);
  this.newDepense.date_facture =new Date(this.depenseForm.get('date_facture').value);
  this.newDepense.numero_facture = Number(this.depenseForm.get("numero_facture").value);
  this.newDepense.type = this.depenseForm.get('type').value;
  this.newDepense.circuit = this.depenseForm.get('circuit').value;
  this.newDepense.fournisseur = this.depenseForm.get('fournisseur').value;
  this.newDepense.description = this.depenseForm.get('description').value;
  this.newDepense.montant_HT = Number(this.depenseForm.get('montant_HT').value);
  this.newDepense.TVA = Number(this.depenseForm.get('TVA').value);
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
      this.addNewD = false;
    }
  )  
}

deleteDialog = false;

confirmDelete(){
  console.log(this.id)
  this.deleteDialog = true;
  this.isEnable = false;
}

getSearchValue(event){
  return event.target.value;
}

getByDate(event){
  var valueToSearch = this.getSearchValue(event);
  let value = this.searchForm.get('search').value;

  if(value == 'date facture'){
    this.depenseService.searchFacture(new Date(valueToSearch)).subscribe(
      response => {
        this.depense = response;
        console.log("facture")
        
      }
    )
  }
  else if(value == 'date opération'){
    this.depenseService.searchOperation(new Date(valueToSearch)).subscribe(
      response => {
        this.depense = response;
        console.log("opération")
      }
    )
  }
  else if(value == 'circuit'){
    this.depenseService.searchCircuit(valueToSearch).subscribe(
      response => {
        this.depense = response
        console.log("circuit")
      }
    )
  }
  
}

id = null;

openEdit(depense: any){
  console.log("ity openEdit fa misokatra")

  this.onRowSelected(depense)

  this.addNewD = true;
  this.selectedRow = depense;
  this.id = this.selectedRow.id;
  const Vdate_operation =new Date(this.selectedRow.date_operation);
  const Vdate_facture =new Date(this.selectedRow.date_facture);
  const Vtype = this.selectedRow.type;
  const Vcircuit = this.selectedRow.circuit;
  const Vfournisseur = this.selectedRow.fournisseur;
  const Vdescription = this.selectedRow.description;
  const Vstatu = this.selectedRow.statu;
  const Vmontant_HT = this.selectedRow.montant_HT
  const Vtva = this.selectedRow.TVA;
  const Vnumero_facture = this.selectedRow.numero_facture;
  
  this.depenseForm.setValue({
    date_operation : Vdate_operation,
    date_facture : Vdate_facture,
    description: Vdescription,
    fournisseur: Vfournisseur,
    montant_HT : Vmontant_HT,
    statu : Vstatu,
    type: Vtype,
    TVA : Vtva,
    circuit : Vcircuit,
    numero_facture : Vnumero_facture
  })

}

editDepense(){
  let valueStorage = localStorage.getItem("admin");
  let objectValueStorage = JSON.parse(valueStorage)

  this.newDepense.date_facture = new Date(this.depenseForm.get('date_facture').value);
  this.newDepense.date_operation = new Date(this.depenseForm.get('date_operation').value);
  this.newDepense.numero_facture = Number(this.depenseForm.get('numero_facture').value);
  this.newDepense.circuit = this.depenseForm.get('circuit').value;
  this.newDepense.description = this.depenseForm.get('description').value;
  this.newDepense.fournisseur = this.depenseForm.get('fournisseur').value;
  this.newDepense.montant_HT = Number(this.depenseForm.get('montant_HT').value);
  this.newDepense.TVA = Number(this.depenseForm.get('TVA').value);
  this.newDepense.statu = this.depenseForm.get('statu').value;
  this.newDepense.type = this.depenseForm.get('type').value;
  //this.newDepense.ref_facture = this.depenseForm.get('ref_facture').value;
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
