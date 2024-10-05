import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private token!: string;
  private userId!: string; // Add userId property
  private mainRoute = 'https://localhost:5000/api/auth/'

  constructor(private http: HttpClient, private router: Router) { }

  signup(fullName: string, idNumber: string, accountNumber: string, password: string) {
    this.http.post(`${this.mainRoute}register`, {
      fullName: fullName,
      idNumber: idNumber,
      accountNumber: accountNumber,
      password: password
    }).subscribe(response => {
      console.log(`this is the response: ${response}`);
      this.router.navigate(['/login'])
    });
  }

  login(fullName: string, accountNumber: string, password: string) {
    this.http.post<{ token: string, userId: string }>(`${this.mainRoute}login`, {
      username: fullName,
      accountNumber: accountNumber,
      password: password
    }).subscribe(response => {
      console.log(`this is the response: ${response}`);
      this.token = response.token;
      this.userId = response.userId; 
      this.loggedIn.next(true);

      localStorage.setItem('token', this.token);
      localStorage.setItem('userId', this.userId);
      this.router.navigate(['/']);
    });
  }

  getToken() {
    return this.token || localStorage.getItem('token');
  }
  
  // Get userId from localStorage if present
  getUserId() {
    return this.userId || localStorage.getItem('userId');
  }

  logout(): void {
    this.loggedIn.next(false);
    this.token = ''; 
    this.userId = ''; 
    localStorage.removeItem('token'); // Remove token from localStorage
    localStorage.removeItem('userId'); // Remove userId from localStorage
    this.router.navigate(['/login']);
  }

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
