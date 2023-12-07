import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Depense } from '../../depense/depense';
import { Recette } from '../../recette/recette';

@Injectable({
  providedIn: 'root'
})
export class BanqueService {

  constructor(private http: HttpClient) { }

  getDepense(){
    return this.http.get<Depense[]>('http://localhost:3000/depense/matched')
  }

  getRecette(){
    return this.http.get<Recette[]>('http://localhost:3000/recette/matched')
  }
}
