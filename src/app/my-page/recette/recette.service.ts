import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Recette } from './recette';
import { NewRecette } from './newRecette';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecetteService {

  constructor(private http: HttpClient) { }
  getRecette(): Observable<Recette[]>{
    return this.http.get<Recette[]>('http://localhost:3000/recette');
  }

  postRecette(recette: NewRecette) : Observable<NewRecette>{
    console.log("postRecette");
    return this.http.post<NewRecette>('http://localhost:3000/recette', recette);
  }

  deleteRecette(id: number){
    return this.http.delete('http://localhost:3000/recette/'+id);
  }

  getByDate(date: Date){
    return this.http.get<Recette[]>('http://localhost:3000/recette/date/'+date);
  }

  updateRecette(id: number, recette: NewRecette) : Observable<NewRecette>{
    return this.http.patch<NewRecette>('http://localhost:3000/recette/'+id, recette);
  }
}

