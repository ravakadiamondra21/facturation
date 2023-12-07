import { Component, OnInit } from '@angular/core';
import { Depense } from '../../depense/depense';
import { CaisseService } from './caisse.service';

@Component({
  selector: 'app-caisse',
  templateUrl: './caisse.component.html',
  styleUrls: ['./caisse.component.scss']
})
export class CaisseComponent implements OnInit{
  constructor(private caisseService : CaisseService){}

  depense: Depense[] = []

  read(){
    return this.caisseService.get().subscribe(
      response => {
        this.depense = response
      }
    )
  }

  ngOnInit(){
    return this.read()
  }
}
