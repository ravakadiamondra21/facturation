import { Component, OnInit } from '@angular/core';
import { Recette } from '../../recette/recette';
import { BanqueService } from './banque.service';

@Component({
  selector: 'app-banque',
  templateUrl: './banque.component.html',
  styleUrls: ['./banque.component.scss']
})
export class BanqueComponent implements OnInit{
  constructor(private banqueService: BanqueService){}

  recette : Recette[] = []

  read(){
    return this.banqueService.get().subscribe(
      response => {
        this.recette = response
      }
    )
  }

  ngOnInit(){
    return this.read()
  }
}
