import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Depense } from '../../depense/depense';

@Injectable({
  providedIn: 'root'
})
export class CaisseService {

  constructor(private http: HttpClient) { }

  get(){
    return this.http.get<Depense[]>('http://localhost:3000/depense/statu/caisse/true')
  }
}
