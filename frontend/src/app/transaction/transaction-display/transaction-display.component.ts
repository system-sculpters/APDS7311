import { Component, OnInit, OnDestroy } from '@angular/core';
import { TransactionServiceService } from '../transaction-service.service';
import { Subscription } from 'rxjs';
import { AuthServiceService } from '../../auth/auth-service.service'; // Import your auth service
import { Router } from '@angular/router';


interface Transaction {
  _id: string;
  userId: User, 
  amount: number, 
  currency: string, 
  provider: string, 
  code: string,
  status: string
}

interface User {
  _id: string;
  fullName: string;
  idNumber: string;
}

@Component({
  selector: 'app-transaction-display',
  templateUrl: './transaction-display.component.html',
  styleUrl: './transaction-display.component.css'
})
export class TransactionDisplayComponent implements OnInit, OnDestroy{
  transactions: Transaction[] = [];

  displayedColumns: string[] = ['position', 'amount', 'currency', 
    'provider', 'code', 'status'];

  private transactionsubscription!: Subscription;

  constructor(public transactionservice: TransactionServiceService,
    private authService: AuthServiceService, private router: Router ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId(); // Retrieve the userId from AuthService
    if (userId) {
      this.transactionservice.gettransactions_service(userId);
      this.transactionsubscription = this.transactionservice.getUpdateListener().subscribe((transactions: Transaction[]) => {
        console.log('Received transactions data:', transactions); // Debugging log
        this.transactions = transactions.map((transaction, index) => ({
          position: index + 1,
          ...transaction
        }));
      });
    } else {
      console.error('UserId is not available');
      this.router.navigate(['/login']);
    }
  }

  ngOnDestroy() {
    if (this.transactionsubscription) { // Check if the subscription is initialized
      this.transactionsubscription.unsubscribe();
    }
  }

  // onDelete(fruitid: string) {
  //   alert(`selected: ${fruitid}`)

  //   this.tr.delete_service(fruitid);
  // }
}
