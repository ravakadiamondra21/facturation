import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recette } from '../../recette/recette';

@Injectable({
  providedIn: 'root'
})
export class CaisseService {

  constructor(private http: HttpClient) { }

  get(){
    return this.http.get<Recette[]>('http://localhost:3000/recette/statu/caisse/true')
  }
}
