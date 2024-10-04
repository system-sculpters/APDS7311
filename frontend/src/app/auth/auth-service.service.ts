import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private loggedIn = new BehaviorSubject<boolean>(false);
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
      this.router.navigate(['/']);
    });
  }

  getToken() {
    return this.token;
  }

  getUserId() {
    return this.userId; // Add getter for userId
  }

  logout(): void {
    this.loggedIn.next(false);
    this.token = ''; // Clear token
    this.userId = ''; // Clear userId
    this.router.navigate(['/login']); // Navigate to login page after logout
  }

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}
