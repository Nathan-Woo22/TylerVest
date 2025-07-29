import { Component, CUSTOM_ELEMENTS_SCHEMA, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageSenderComponent } from './MessageSenderComponent';


@Component({
  selector: 'app-investments',
  standalone: true,
  imports: [CommonModule, MessageSenderComponent ],
  template: `
    <div class="investments-container">
      <header class="investments-header">
        <h1 class="investments-title">Investments</h1>
      </header>
    <div class="text-field-container">
        <label for="textInput" class="text-field-label">Label</label>
        <input type="text" id="textInput" class="text-field-input">
    </div>

    <div>
        <app-message-sender></app-message-sender>
    </div>
    
    </div>
  `,
  styles: [`
    .investments-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      font-family: Arial, sans-serif;
    }

    .investments-header {
      margin-bottom: 30px;
      text-align: center;
    }

    .investments-title {
      color: #333;
      font-size: 2rem;
      font-weight: 600;
      margin: 0;
      padding-bottom: 10px;
      border-bottom: 2px solid #e0e0e0;
    }

    .investments-content {
      background: #f9f9f9;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 768px) {
      .investments-container {
        padding: 15px;
      }
      
      .investments-title {
        font-size: 1.5rem;
      }
      
      .investments-content {
        padding: 15px;
      }
    }

    .text-field-container {
  margin-bottom: 16px;
}

    .text-field-label {
    display: block;
    margin-bottom: 4px;
    font-weight: 500;
    color: #333;
    }

    .text-field-input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    }

    .text-field-input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }
  `]
})
export class InvestmentsComponent {
  constructor() {}
}