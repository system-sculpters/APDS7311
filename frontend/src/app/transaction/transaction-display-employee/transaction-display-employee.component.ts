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
  selector: 'app-transaction-display-employee',
  templateUrl: './transaction-display-employee.component.html',
  styleUrl: './transaction-display-employee.component.css'
})
export class TransactionDisplayEmployeeComponent implements OnInit, OnDestroy{
    transactions: Transaction[] = [];
  
    displayedColumns: string[] = ['position', 'user', 'amount', 'currency', 
      'provider', 'code', 'status', 'reciever', 'verify'];
  
    private transactionsubscription!: Subscription;
  
    constructor(public transactionservice: TransactionServiceService,
      private authService: AuthServiceService, private router: Router ) {}
  
    private getTransactions = () =>{
      this.transactionservice.getalltransactions_service();
      this.transactionsubscription = this.transactionservice.getUpdateListener().subscribe((transactions: Transaction[]) => {
        console.log('Received transactions data:', transactions); // Debugging log
        this.transactions = transactions.map((transaction, index) => ({
          position: index + 1,
          user: transaction.userId.fullName, 
          ...transaction
        }));
      });
    }
    ngOnInit(): void {
      const role = this.authService.getRole()
      
      console.log(`role: ${role}`)
      if (role == 'employee') {
        this.getTransactions()
      } else {
        console.error('Role is not available');
        this.router.navigate(['/login']);
      }
    }
  
    verifyTransaction(transaction: Transaction) {
      this.transactionservice.verifytransaction_service(transaction._id)
      //transaction.status = 'Verified';
      this.getTransactions()

    }
    ngOnDestroy() {
      if (this.transactionsubscription) { // Check if the subscription is initialized
        this.transactionsubscription.unsubscribe();
      }
    }
}
