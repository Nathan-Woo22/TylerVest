import { Component, inject, Input } from '@angular/core';
import {Message, MessageService, BlobMessage } from '../MessageService';

@Component({
  selector: 'app-message-sender',
  standalone: true,
  template: `
    <div class="message-sender-container">
      <h2>Send Message</h2>
      
      <button 
        type="button" 
        (click)="sendMessage()"
        class="send-button">
        Send Message
      </button>
    </div>
  `,
  styles: [`
    .message-sender-container {
      max-width: 500px;
      margin: 20px auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-family: Arial, sans-serif;
      text-align: center;
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
  // Inject the MessageService
   constructor(private messageService: MessageService) {}

  // Handle button click
  sendMessage(): void {

    const messageDetails = {
      LoanAmount: this.loanData?.loanAmount || 0,
      InterestRate: this.loanData?.interestRate || 0,
      Term: this.loanData?.term || 0,
      LenderName: this.loanData?.lenderName || ''
    };

    // Create the final message object with id and blob only
    const message: BlobMessage = {
      id: this.generateMessageId(),
      blob: JSON.stringify(messageDetails)
    };

    this.messageService.sendMessage(message);
  }
    private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}