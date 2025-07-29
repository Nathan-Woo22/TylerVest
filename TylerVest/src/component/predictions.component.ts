import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-predictions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="predictions-container">
      <header class="predictions-header">
        <h1 class="predictions-title">Predictions</h1>
      </header>
      
    </div>
  `,
  styles: [`
    .predictions-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      font-family: Arial, sans-serif;
    }

    .predictions-header {
      margin-bottom: 30px;
      text-align: center;
    }

    .predictions-title {
      color: #333;
      font-size: 2rem;
      font-weight: 600;
      margin: 0;
      padding-bottom: 10px;
      border-bottom: 2px solid #e0e0e0;
    }

    .predictions-content {
      background: #f9f9f9;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 768px) {
      .predictions-container {
        padding: 15px;
      }
      
      .predictions-title {
        font-size: 1.5rem;
      }
      
      .predictions-content {
        padding: 15px;
      }
    }
  `]
})
export class PredictionsComponent {
  constructor() {}
}