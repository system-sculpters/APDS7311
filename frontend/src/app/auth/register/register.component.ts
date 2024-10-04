import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../auth/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: '../../transaction/transaction-create/transaction-create.component.css'
})
export class RegisterComponent  implements OnInit{
  constructor(public authservice: AuthServiceService, private router: Router) {}

  option(): string {
    return '/login';
  }
  ngOnInit(): void {
    
  }

  onregister(registerform: NgForm){
    
    if(registerform.invalid){
      return;
    }
    this.authservice.signup(registerform.value.enteredfullname, registerform.value.enteredidnumber,
      registerform.value.enteredaccountnumber, registerform.value.enteredpassword
    )
  }
}
