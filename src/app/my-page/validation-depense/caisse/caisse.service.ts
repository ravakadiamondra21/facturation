import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Depense } from '../../depense/depense';
import { NewDepense } from '../../depense/newDepense';
import { Solde } from '../../solde';

@Injectable({
  providedIn: 'root'
})
export class CaisseService {

  constructor(private http: HttpClient) { }

  getNotValidate(){
    return this.http.get<Depense[]>('http://localhost:3000/depense/statu/caisse/false');
  }

  updateValidation(id: number, depense: NewDepense){
    return this.http.patch<NewDepense>('http://localhost:3000/depense/'+id, depense);
  }

  getSolde(){
    return this.http.get<Solde>('http://localhost:3000/solde/caisse');
  }

  updateSolde(nom: string, newSolde : Solde){
    return this.http.patch<Solde>('http://localhost:3000/solde/' +nom, newSolde)
  }
}
