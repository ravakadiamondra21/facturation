import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Depense } from '../../depense/depense';
import { NewDepense } from '../../depense/newDepense';

@Injectable({
  providedIn: 'root'
})
export class AutreService {

  constructor(private http: HttpClient) { }

  getNotValidate(){
    return this.http.get<Depense[]>('http://localhost:3000/depense/statu/à definir/false');
  }

  updateValidation(id: number, newDepense: NewDepense){
    return this.http.patch<NewDepense>('http://localhost:3000/depense/' +id, newDepense)
  }
}
