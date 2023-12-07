import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Depense } from './depense';
import { NewDepense } from './newDepense';

@Injectable({
  providedIn: 'root'
})
export class DepenseService {

  constructor(private http: HttpClient) { }


  getDepense(): Observable<Depense[]>{
    return this.http.get<Depense[]>('http://localhost:3000/depense/sort');
  }

  postDepense(depense: NewDepense): Observable<NewDepense>{
    return this.http.post<NewDepense>('http://localhost:3000/depense', depense);
  }
  
  deleteDepense(id: number){
    return this.http.delete('http://localhost:3000/depense/'+id);
  }

  getByDate(date: Date){
    return this.http.get<Depense[]>('http://localhost:3000/depense/dateOperation/'+date+'/banque/à definir');
  }

  updateDepense(id: number, depense: NewDepense): Observable<any>{
    return this.http.patch<NewDepense>('http://localhost:3000/depense/'+id, depense)
  }

  countMatched(ref_lettrage) : Observable<Number>{
    return this.http.get<Number>('http://localhost:3000/depense/count/'+ref_lettrage)
  }

  searchFacture(date: Date){
    return this.http.get<Depense[]>('http://localhost:3000/depense/dateFacture/'+date)
  }

  searchOperation(date: Date){
    return this.http.get<Depense[]>('http://localhost:3000/depense/date_operation/'+date)
  }

  searchCircuit(circuit: string){
    return this.http.get<Depense[]>('http://localhost:3000/depense/circuit/'+circuit)
  }
}
