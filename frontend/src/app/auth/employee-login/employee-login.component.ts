import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../auth/auth-service.service';

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrl: '../../transaction/transaction-create/transaction-create.component.css'
})
export class EmployeeLoginComponent {
  constructor(public authservice: AuthServiceService, private router: Router) {}

  option(): string {
    return '/login';
  }
  
  onlogin(loginform: NgForm){
    
    if(loginform.invalid){
      return;
    }
    this.authservice.employeeLogin(
      loginform.value.enteredEmail, 
      loginform.value.enteredPassword
    ) 
  }
}
