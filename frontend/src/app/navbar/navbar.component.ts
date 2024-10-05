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

  constructor(private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(status => {
      this.isLoggedIn = status;
      this.isLoggedOut = !status;
    });
  }

  onLogout(): void {
    this.authService.logout();
    
  }
}
