import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import { Login } from './login';


@Component({
  selector: 'app-login',
  
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  
})
export class LoginComponent implements OnInit{
 

  constructor(private loginService : LoginService, private httpClient : HttpClient){

  }

  loginForm = new FormGroup(
    {
      email : new FormControl(''),
      pwd : new FormControl('')
    }
  );

  ngOnInit(){
    
  }

  login : Login;
  
   routerLink: string;

   wrongLogin = '';

  verifyLogin(){

    const mail = String(this.loginForm.get('email').value);
    const pwd = this.loginForm.get("pwd").value;
   
    let result: Login
    this.loginService.getAdmin(mail).subscribe(
      response=>{
        result = response;

        console.log(result)

    if(result === null){
      this.wrongLogin= "Erreur de login"
      this.routerLink = '/mylogin'
      this.loginForm.setValue({
        email : "",
        pwd: ""
      })
      
    }

    else if(result.mail == mail && result.mdp == pwd){
      this.routerLink = '/mydashboard'
      this.loginForm.setValue({
        email : "",
        pwd: ""
      })
      let stringToStore = JSON.stringify(result);
        localStorage.setItem("admin", stringToStore);
    }

    else{
      this.wrongLogin = "mail ou mot de passe invalide"
      this.routerLink = '/mylogin'
      this.loginForm.setValue({
        email : "",
        pwd: ""
      })
    }        
      },
      
    )

    console.log(localStorage.getItem("admin"))
    
    }
}
