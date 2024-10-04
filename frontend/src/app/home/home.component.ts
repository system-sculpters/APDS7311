import { Component } from '@angular/core';
import { AuthServiceService } from '../auth/auth-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isLoggedIn: boolean = false;
  isLoggedOut: boolean = true;

  constructor(private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(status => {
      this.isLoggedIn = status;
      this.isLoggedOut = !status;
    });
  }
}
