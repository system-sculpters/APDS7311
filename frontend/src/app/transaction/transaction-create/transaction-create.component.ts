import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { TransactionServiceService } from '../transaction-service.service';
import { AuthServiceService } from '../../auth/auth-service.service';

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrl: './transaction-create.component.css'
})
export class TransactionCreateComponent implements OnInit{
  constructor(public transactionservice: TransactionServiceService, public authservice: AuthServiceService) {}

  selectedProvider: string | null = null; // To store the selected provider
  code: string = '';  

  ngOnInit(): void {
    
  }


  // Returns regex pattern based on the selected provider
  getProviderCodePattern(): string {
    switch (this.selectedProvider) {
      case 'SWIFT':
        return '^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$'; // SWIFT code pattern
      case 'Wise':
        return '^[A-Z0-9]{8,11}$';  // Wise code pattern
      case 'PayPal':
        return '^[A-Z0-9]{13}$';  // PayPal code pattern
      default:
        return '';  // No pattern if no provider is selected
    }
  }

  onaddtransaction(transactionform: NgForm) {
    if(transactionform.invalid){
      alert('Invalid')
      return
    }

    const userId = this.authservice.getUserId()
    this.transactionservice.addtransaction_service(userId, transactionform.value.amount, transactionform.value.currency, transactionform.value.provider, transactionform.value.code)
    transactionform.resetForm()
  }
}
