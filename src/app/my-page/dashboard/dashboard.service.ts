import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient: HttpClient) { }

  getDepense(){
    return this.httpClient.get('http://localhost:3000/depense');
  }

  getRecette(){
    return this.httpClient.get('http://localhost:3000/recette');
  }

  // getDepenseByDate(date){
  //   return this.httpClient.get('http://localhost:3000/depense/date/'+date);
  // }  

  getRecetteByDate(date){
    return this.httpClient.get('http://localhost:3000/recette/date/'+ date)
  }

  countRecette(date){
    return this.httpClient.get('http://localhost:3000/recette/count/'+ date)
  }

  // countDepense(date){
  //   return this.httpClient.get('http://localhost:3000/depense/count/'+date)
  // }
}
