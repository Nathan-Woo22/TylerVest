import { Component, inject, Input } from '@angular/core';
import {MessageService, BlobMessage } from '../MessageService';

@Component({
  selector: 'app-message-sender',
  standalone: true,
  template: `
    <div class="message-sender-container">
      <button 
        type="button" 
        (click)="saveLoadInfo()"
        class="styled-button">
        Submit Investment/Loan
      </button>
    </div>
  `,
  styles: [`
    .message-sender-container {
      max-width: 500px;
      margin: 20px auto;
      padding: 20px;
      font-family: Arial, sans-serif;
      text-align: center;
    }

    .styled-button {
      padding: 12px 20px;
      background-color: #42a5f5;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
      transition: background-color 0.3s ease, box-shadow 0.3s ease;
    }

    h2 {
      color: #333;
      margin-bottom: 20px;
    }

    .send-button {
      padding: 12px 20px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .send-button:hover {
      background-color: #0056b3;
    }
  `]
})
export class MessageSenderComponent {

  @Input() loanData: any;
  @Input() isLoanMessage: boolean = false;
  // Inject the MessageService
   constructor(private messageService: MessageService) {
        this.saveLoadInfo = this.saveLoadInfo.bind(this);
   }

  // Handle button click
  saveLoadInfo(): void {

    const messageDetails = {
      Principal: this.loanData?.Principal || 0,
      InterestRate: this.loanData?.InterestRate || 0,
      NumPayments: this.loanData?.NumPayments || 0,
      StartDate: this.loanData?.StartDate || '',
      LoanName: this.loanData?.LoanName || ''
    };
    console.log(messageDetails);

    // Create the final message object with id and blob only
    const message: BlobMessage = {
      id: this.generateMessageId(),
      blob: JSON.stringify(messageDetails)
    };

    this.messageService.sendMessage(message);
  }
    private generateMessageId(): string {
      const baseMessage = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      if (this.isLoanMessage) {
        console.log("LOAN");
        return `Add_Loan` + baseMessage;
      }
      return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}