import { Component, OnInit } from '@angular/core';
import { Depense } from '../../depense/depense';
import { Recette } from '../../recette/recette';
import { BanqueService } from './banque.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-banque',
  templateUrl: './banque.component.html',
  styleUrls: ['./banque.component.scss']
})
export class BanqueComponent implements OnInit{

  constructor(private banqueService : BanqueService){}

  depense : Depense[] = []
  recette: Recette[] = []
  together : any[] = []

  ngOnInit(){
    this.get()
  }

  get(){
    this.together = []
    this.banqueService.getDepense().subscribe(
      response => {
        this.depense = response;
        this.together.push(this.depense)
        console.log(this.depense)
        this.banqueService.getRecette().subscribe(
          response => {
            this.recette = response;
            console.log(this.recette)
            //this.together.push(this.depense);
            this.together.push(this.recette)

            // this.together.sort((a, b) => b.ref_lettrage.localeCompare(a.ref_lettrage));

            console.log(this.together)
          }
        )
      }
    )
  }

  exportFile(fileName: string, data: any){
    const ws : XLSX.WorkSheet = XLSX.utils.json_to_sheet(data)
    const wb : XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
    XLSX.writeFile(wb, fileName)
  }

  dataDepense;
  dataRecette;

  exportDepense(){
    this.banqueService.getDepense().subscribe(
      response => {
        this.dataDepense = response;
        this.exportFile("depense.xlsx", this.dataDepense)
        console.log(this.dataDepense)
      }
    )
  }

  exportRecette(){
    this.banqueService.getRecette().subscribe(
      response => {
        this.dataRecette = response;

        this.exportFile("recette", this.dataRecette)
      }
    )
  }
  
}
