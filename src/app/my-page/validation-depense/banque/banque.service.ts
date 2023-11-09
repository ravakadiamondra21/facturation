import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Depense } from '../../depense/depense';
import { NewDepense } from '../../depense/newDepense';
import { Solde } from '../../solde';

@Injectable({
  providedIn: 'root'
})
export class BanqueService {

  constructor(private http: HttpClient) {}
  
   getNotValidate(){
     return this.http.get<Depense[]>('http://localhost:3000/depense/statu/banque/false');
   }

   updateDepense(id: number, newDepense: NewDepense){
     return this.http.patch<NewDepense>('http://localhost:3000/depense/'+id, newDepense);
   }

   getSolde(){
     return this.http.get<Solde>('http://localhost:3000/solde/banque');
   }

   updateSolde(nom: string, solde: Solde){
     return this.http.patch<Solde>('http://localhost:3000/solde/' +nom, solde);
   }
}
