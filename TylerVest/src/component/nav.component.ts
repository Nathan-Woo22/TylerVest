import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-brand">
          <h2              
            routerLink="/home" 
            routerLinkActive="active"
            class="nav-link">Tyler Vest</h2>
        </div>
        <ul class="nav-menu">
          <li class="nav-item">
            <a 
              routerLink="/investments" 
              routerLinkActive="active"
              class="nav-link"
            >
              Investments
            </a>
          </li>

          <li class="nav-item">
            <a 
              routerLink="/predictions" 
              routerLinkActive="active"
              class="nav-link"
            >
              Predictions
            </a>
          </li>

        </ul>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 70px;
    }

    .nav-brand h2 {
      color: white;
      margin: 0 1rem 0 0;
      font-size: 1.8rem;
      font-weight: 600;
      letter-spacing: -0.5px;
    }

    .nav-menu {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: 2rem;
    }

    .nav-item {
      position: relative;
    }

    .nav-link {
      color: white;
      text-decoration: none;
      font-weight: 500;
      font-size: 1rem;
      padding: 10px 16px;
      border-radius: 8px;
      transition: all 0.3s ease;
      position: relative;
      display: block;
    }

    .nav-link:hover {
      background-color: rgba(255, 255, 255, 0.1);
      transform: translateY(-2px);
    }

    .nav-link.active {
      background-color: rgba(255, 255, 255, 0.2);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .nav-link.active::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 50%;
      transform: translateX(-50%);
      width: 30px;
      height: 3px;
      background-color: white;
      border-radius: 2px;
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .nav-container {
        padding: 0 15px;
        height: 60px;
      }

      .nav-brand h2 {
        font-size: 1.5rem;
      }

      .nav-menu {
        gap: 1rem;
      }

      .nav-link {
        font-size: 0.9rem;
        padding: 8px 12px;
      }
    }

    @media (max-width: 480px) {
      .nav-menu {
        gap: 0.5rem;
      }

      .nav-link {
        font-size: 0.8rem;
        padding: 6px 10px;
      }
    }
  `]
})
export class NavigationComponent {
  constructor() {}
}