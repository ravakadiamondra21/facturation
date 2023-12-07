import { Component } from '@angular/core';
import { Recette } from '../../recette/recette';
import { CaisseService } from './caisse.service';

@Component({
  selector: 'app-caisse',
  templateUrl: './caisse.component.html',
  styleUrls: ['./caisse.component.scss']
})
export class CaisseComponent {
  constructor(private caisseService: CaisseService){

  }

  recette : Recette[] = []
  read(){
    return this.caisseService.get().subscribe(
      response => {
        this.recette = response
      }
    )
  }
}
