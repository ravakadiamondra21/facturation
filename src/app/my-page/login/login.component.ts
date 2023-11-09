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
      id: new FormControl(''),
      email : new FormControl(''),
      pwd : new FormControl('')
    }
  );

  ngOnInit(){
    
  }

  login : Login;

  getAdmin() {
    const mail = this.loginForm.get('email').value;
   
    let result: Login
    this.loginService.getAdmin(mail).subscribe(
      response=>{
        result = response;

        let stringToStore = JSON.stringify(result);
        localStorage.setItem("admin", stringToStore);
        console.log(localStorage.getItem("admin"))
      },
      
    )
  }
  
   routerLink: string;

   wrongLogin = '';

  verifyLogin(){
    
    const mail = this.loginForm.get("email").value;
    const pwd = this.loginForm.get("pwd").value;

    let valueStorage = localStorage.getItem("admin");
    let objectValueStorage = JSON.parse(valueStorage)

    if(objectValueStorage === null){
      this.wrongLogin= "else voalohany"
      this.routerLink = '/mylogin'
      localStorage.removeItem("admin")
    }

    else if(objectValueStorage.mail == mail && objectValueStorage.mdp == pwd){
      this.routerLink = '/mydashboard'
    }

    else{
      this.wrongLogin = "else faharoa"
      this.routerLink = '/mylogin'
      localStorage.removeItem('admin')
    }

    }
}
