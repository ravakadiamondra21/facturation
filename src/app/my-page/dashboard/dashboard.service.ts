import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient: HttpClient) { }

  getDepense(){
    return this.httpClient.get('http://localhost:3000/depense/date/');
  }

  getRecette(){
    return this.httpClient.get('http://localhost:3000/recette');
  }

  getDepenseByDate(date: Date){
    return this.httpClient.get('http://localhost:3000/depense/date/'+date);
  }  
}
