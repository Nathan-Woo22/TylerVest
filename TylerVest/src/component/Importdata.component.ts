import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-importdata',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="importdata-container">
      <header class="importdata-header">
        <h1 class="importdata-title">import data</h1>
      </header>
    
    </div>
  `,
  styles: [`
    .importdata-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      font-family: Arial, sans-serif;
    }

    .importdata-header {
      margin-bottom: 30px;
      text-align: center;
    }

    .importdata-title {
      color: #333;
      font-size: 2rem;
      font-weight: 600;
      margin: 0;
      padding-bottom: 10px;
      border-bottom: 2px solid #e0e0e0;
    }

    .importdata-content {
      background: #f9f9f9;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 768px) {
      .importdata-container {
        padding: 15px;
      }
      
      .importdata-title {
        font-size: 1.5rem;
      }
      
      .importdata-content {
        padding: 15px;
      }
    }
  `]
})
export class ImportDataComponent {
  constructor() {}
}