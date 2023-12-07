import { Component, OnInit } from '@angular/core';
import { Depense } from '../../depense/depense';
import { Recette } from '../../recette/recette';
import { BanqueService } from './banque.service';

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
        console.log(this.depense)
        this.banqueService.getRecette().subscribe(
          response => {
            this.recette = response;
            console.log(this.recette)
            this.together.push(this.depense);
            this.together.push(this.recette)

            this.together.sort((a, b) => b.ref_lettrage.localeCompare(a.ref_lettrage));

            console.log(this.together)
          }
        )
      }
    )
  }
  
}
