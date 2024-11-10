import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private readonly loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private token!: string;
  private userId!: string;
  private role!: string;
  private readonly mainRoute = 'https://localhost:5000/api/auth/';

  constructor(private readonly http: HttpClient, private readonly router: Router) { }

  signup(fullName: string, idNumber: string, accountNumber: string, password: string) {
    const credentials = { fullName, idNumber, accountNumber, password };
    this.http.post(`${this.mainRoute}register`, credentials)
      .subscribe(response => {
        console.log(`Response: ${JSON.stringify(response)}`);
        this.router.navigate(['/login']);
      });
  }

  login(fullName: string, accountNumber: string, password: string) {
    const credentials = { username: fullName, accountNumber, password };
    this.authenticateUser('login', credentials);
  }

  employeeLogin(email: string, password: string) {
    const credentials = { email, password };
    this.authenticateUser('employee-login', credentials);
  }

  getToken(): string | null {
    return this.token || this.getLocalStorage('token');
  }

  getUserId(): string | null {
    return this.userId || this.getLocalStorage('userId');
  }

  getRole(): string | null {
    return this.role || this.getLocalStorage('role');
  }

  logout(): void {
    this.loggedIn.next(false);
    this.token = '';
    this.userId = '';
    this.role = '';
    this.clearLocalStorage();
    this.router.navigate(['/login']);
  }

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  private hasToken(): boolean {
    return !!this.getLocalStorage('token');
  }

  private authenticateUser(endpoint: string, credentials: any): void {
    this.http.post<{ token: string, userId: string, role: string }>(`${this.mainRoute}${endpoint}`, credentials)
      .subscribe(response => {
        console.log(`Response: ${JSON.stringify(response)}`);
        this.token = response.token;
        this.userId = response.userId;
        this.role = response.role;
        this.loggedIn.next(true);
        this.setLocalStorage('token', this.token);
        this.setLocalStorage('userId', this.userId);
        this.setLocalStorage('role', this.role);
        this.router.navigate(['/']);
      });
  }

  private setLocalStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  private getLocalStorage(key: string): string | null {
    return localStorage.getItem(key);
  }

  private clearLocalStorage(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
  }
}
