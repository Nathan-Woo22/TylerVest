import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home-container">
      <header class="hero-section">
        <h1 class="welcome-title">Welcome to TylerVest</h1>
        <p class="welcome-subtitle">Lets make some damn money</p>
      </header>

      <main class="main-content">
        <section class="features">
          <h2>What We Offer</h2>
          <div class="feature-grid">
            <div class="feature-card">
              <h3>Stuff</h3>
              <p>We provide top-notch services tailored to your needs.</p>
            </div>
            <div class="feature-card">
              <h3>Stuff</h3>
              <p>Our experienced professionals are here to help you succeed.</p>
            </div>
            <div class="feature-card">
              <h3>Stuff</h3>
              <p>Round-the-clock assistance whenever you need it.</p>
            </div>
          </div>
        </section>

        <section class="about">
          <h2>About Us</h2>
          <p>
            Ev, Bethany, Nate Dawg, Chris
          </p>
        </section>
      </main>

      <footer class="footer">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  `,
  styles: [`
    .home-container {
      min-height: 100vh;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
    }

    .hero-section {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-align: center;
      padding: 4rem 2rem;
    }

    .welcome-title {
      font-size: 3rem;
      margin-bottom: 1rem;
      font-weight: 700;
    }

    .welcome-subtitle {
      font-size: 1.2rem;
      opacity: 0.9;
      max-width: 600px;
      margin: 0 auto;
    }

    .main-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 3rem 2rem;
    }

    .features {
      margin-bottom: 3rem;
    }

    .features h2,
    .about h2 {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 2rem;
      color: #2c3e50;
    }

    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }

    .feature-card {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      text-align: center;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .feature-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    }

    .feature-card h3 {
      color: #667eea;
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

    .feature-card p {
      color: #666;
      font-size: 1rem;
    }

    .about {
      background: #f8f9fa;
      padding: 3rem;
      border-radius: 10px;
      text-align: center;
    }

    .about p {
      font-size: 1.1rem;
      max-width: 800px;
      margin: 0 auto;
      color: #555;
    }

    .footer {
      background: #2c3e50;
      color: white;
      text-align: center;
      padding: 2rem;
      margin-top: 3rem;
    }

    .footer p {
      margin: 0;
      opacity: 0.8;
    }

    @media (max-width: 768px) {
      .welcome-title {
        font-size: 2rem;
      }

      .hero-section {
        padding: 2rem 1rem;
      }

      .main-content {
        padding: 2rem 1rem;
      }

      .feature-grid {
        grid-template-columns: 1fr;
      }

      .about {
        padding: 2rem;
      }
    }
  `]
})
export class HomeComponent {
  constructor() {}
}