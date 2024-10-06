import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Subject, throwError } from 'rxjs';

interface Transaction {
  _id: string;
  userId: string, 
  amount: number, 
  currency: string, 
  provider: string, 
  code: string,
  status: string,
  reciever: string
  __v: number
}

@Injectable({
  providedIn: 'root'
})
export class TransactionServiceService {
  private transactionsdisplay: Transaction[] = [];
  private updatedtransactionsdisplay = new Subject<Transaction[]>();
  private mainRoute = 'https://localhost:5000/api/payment/'
  constructor(private http: HttpClient) { }

  addtransaction_service(userId: string, amount: number, currency: string, provider: string, code: string, reciever: string) {
    this.http.post<{message: string}>( `${this.mainRoute}${userId}`, {amount, currency, provider, code, reciever})
    .pipe(catchError(this.handleError))
    .subscribe((transactions) => {
        
      });
  }

  gettransactions_service(userId: string) {
   
    this.http.get<{message: string, transactions: Transaction[]}>(`${this.mainRoute}${userId}`)
      .pipe(catchError(this.handleError))
      .subscribe((response) => {
        console.log('API Response:', response); // Inspect the API response
        this.transactionsdisplay = response.transactions;
        this.updatedtransactionsdisplay.next([...this.transactionsdisplay]);
      });
  } 

  getUpdateListener() {
    return this.updatedtransactionsdisplay.asObservable();
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Something went wrong:', error.message);
    return throwError('Something went wrong; please try again later.');
  }
}
