import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../auth/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: '../../transaction/transaction-create/transaction-create.component.css'
})
export class LoginComponent {
  constructor(public authservice: AuthServiceService, private router: Router) {}

  option(): string {
    return '/login';
  }
  
  onlogin(loginform: NgForm){
    
    if(loginform.invalid){
      return;
    }
    this.authservice.login(
      loginform.value.enteredfullname, 
      loginform.value.enteredaccountnumber, 
      loginform.value.enteredpassword
    ) 
  }
}
