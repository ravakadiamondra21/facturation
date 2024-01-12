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

  countRecette(){
    return this.httpClient.get('http://localhost:3000/recette/count')
  }

  countDepense(){
    return this.httpClient.get('http://localhost:3000/depense/count')
  }

  countBanking(){
    return this.httpClient.get('http://localhost:3000/banque/count')
  }

  countDepenseByDate(date_facture){
    return this.httpClient.get('http://localhost:3000/depense/countByDate/'+date_facture)
  }

  countRecetteByDate(date_facture){
    return this.httpClient.get('http://localhost:3000/recette/countByDate/'+date_facture)
  }

  countBankingByDate(date_operation){
    return this.httpClient.get('http://localhost:3000/banque/countByDate/'+ date_operation)
  }

  countRecetteByMonth(date_facture){
    return this.httpClient.get('http://localhost:3000/recette/countByMonth/'+ date_facture)
  }

  countDepenseByMonth(date_facture){
    return this.httpClient.get('http://localhost:3000/depense/countByMonth/' +date_facture)
  }
}
