import { HttpClient } from '@angular/common/http';
import { Injectable, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Login } from './login';


@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private http: HttpClient) { }

    getAdmin(mail: string): Observable<Login>{
      return this.http.get<Login>('http://localhost:3000/admin/'+mail);
    }

}
