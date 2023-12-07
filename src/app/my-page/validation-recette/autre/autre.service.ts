import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Depense } from '../../depense/depense';
import { NewDepense } from '../../depense/newDepense';
import { NewRecette } from '../../recette/newRecette';
import { Recette } from '../../recette/recette';

@Injectable({
  providedIn: 'root'
})
export class AutreService {

  // constructor(private http: HttpClient) { }

  // getNotValidate(){
  //   return this.http.get<Recette[]>('http://localhost:3000/recette/statu/à definir/false');
  // }

  // updateValidation(id: number, newDepense: NewRecette){
  //   return this.http.patch<NewRecette>('http://localhost:3000/recette/' +id, newDepense)
  // }
}
