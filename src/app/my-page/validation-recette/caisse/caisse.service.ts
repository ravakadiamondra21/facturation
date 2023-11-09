import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewRecette } from '../../recette/newRecette';
import { Recette } from '../../recette/recette';
import { Solde } from '../../solde';

@Injectable({
  providedIn: 'root'
})
export class CaisseService {

  constructor(private http: HttpClient) { }

  getNotValidate(){
    return this.http.get<Recette[]>('http://localhost:3000/recette/statu/caisse/false')
  }

  updateValidation(id: number, newRecette: NewRecette){
    return this.http.patch<NewRecette>('http://localhost:3000/recette/'+id, newRecette);
  }

  getSolde(){
    return this.http.get<Solde>('http://localhost:3000/solde/caisse');
  }

  updateSolde(nom: string, newSolde : Solde){
    return this.http.patch<Solde>('http://localhost:3000/solde/' +nom, newSolde)
  }
}
