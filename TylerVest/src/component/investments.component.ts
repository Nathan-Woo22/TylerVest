import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-investments',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="investments-container">
      <header class="investments-header">
        <h1 class="investments-title">Investments</h1>
      </header>
    
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
  `]
})
export class InvestmentsComponent {
  constructor() {}
}