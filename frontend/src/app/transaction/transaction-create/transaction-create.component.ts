import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { TransactionServiceService } from '../transaction-service.service';
import { AuthServiceService } from '../../auth/auth-service.service';

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrl: './transaction-create.component.css'
})
export class TransactionCreateComponent{
  constructor(public transactionservice: TransactionServiceService, public authservice: AuthServiceService) {}

  selectedProvider: string | null = null; // To store the selected provider
  code: string = '';  

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

  getValidationMessage(): string | null {
    const swiftPattern = /^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/;
    const wisePattern = /^[A-Z0-9]{8,11}$/;
    const paypalPattern = /^[A-Z0-9]{13}$/;

    if (this.selectedProvider === 'SWIFT') {
      if (!swiftPattern.test(this.code)) {
        return "SWIFT codes must be 8 to 11 characters long, beginning with 6 letters and 2 alphanumeric characters";
      }
    } else if (this.selectedProvider === 'Wise') {
      if (!wisePattern.test(this.code)) {
        return "Wise codes must be between 8 and 11 alphanumeric characters.";
      }
    } else if (this.selectedProvider === 'PayPal') {
      if (!paypalPattern.test(this.code)) {
        return "PayPal codes must be exactly 13 alphanumeric characters.";
      }
    }
    return null; // No validation error
  }


  onaddtransaction(transactionform: NgForm) {
    if(transactionform.invalid){
      alert('Invalid')
      return
    }

    const userId = this.authservice.getUserId()
    if (!userId) {
      return;
    }
    this.transactionservice.addtransaction_service(userId, transactionform.value.amount, transactionform.value.currency, transactionform.value.provider, transactionform.value.code, transactionform.value.enteredaccountnumber)
    transactionform.resetForm()
  }
}
