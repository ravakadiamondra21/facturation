import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Banking } from './banking';
import { NewBanking } from './newBanking';
import { RelationDepense } from './relation_depense';

@Injectable({
  providedIn: 'root'
})
export class BankingService {

  constructor(private http : HttpClient) { }

  saveBanking(data : NewBanking[]) : Observable<NewBanking[]>{
    console.log("service banking front")
    return this.http.post<NewBanking[]>('http://localhost:3000/banque', data);
  }

  findNotMatched() : Observable<Banking[]>{
    return this.http.get<Banking[]>('http://localhost:3000/banque');
  }

  updateBanque(id: number, banque: NewBanking){
    return this.http.patch<NewBanking>('http://localhost:3000/banque/'+id, banque);
  }

  saveRelationDepense(data: RelationDepense) : Observable<RelationDepense>{
    return this.http.post<RelationDepense>('http://localhost:3000/relation-depense', data)
  }


}
