import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Signup } from './signup/signup';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }
  postSingup(signup: Signup ): Observable<Signup>{
    return this.http.post<Signup>('http://localhost:3000/admin', signup);
  }
}
