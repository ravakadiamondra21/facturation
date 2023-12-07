import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Banking } from './banking';
import { NewBanking } from './newBanking';

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

  countByRef(ref_lettrage) : Observable<Number>{
    return this.http.get<Number>('http://localhost:3000/banque/count/'+ref_lettrage);
  }
}
