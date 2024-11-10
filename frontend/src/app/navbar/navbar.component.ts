import { Component } from '@angular/core';
import { AuthServiceService } from '../auth/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoggedIn: boolean = false;
  isLoggedOut: boolean = true;
  isUser: boolean = false;
  isEmployee: boolean = true;

  constructor(private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(status => {
      this.isLoggedIn = status;
      this.isLoggedOut = !status;
    });

    const role = this.authService.getRole()

    if(role && role == 'employee'){
      this.isEmployee = true
      this.isUser = false
    } else {
      this.isEmployee = false
      this.isUser = true
    }
  }

  onLogout(): void {
    this.authService.logout();
    
  }
}
