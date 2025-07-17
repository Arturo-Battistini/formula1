import { Component, inject } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  template: `
    <div class="not-found-container">
      <div class="not-found-content">
        <h1>404</h1>
        <h2>¡Oops! Página no encontrada</h2>
        <p>La página que buscas no existe o ha sido movida.</p>
        <button (click)="goHome()" class="home-button">
          Volver al Inicio
        </button>
      </div>
    </div>
  `,
  styles: [`
    .not-found-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      font-family: 'Formula1-Regular', sans-serif;
    }

    .not-found-content {
      text-align: center;
      color: white;
      padding: 2rem;
      border-radius: 15px;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }

    h1 {
      font-size: 6rem;
      margin: 0;
      font-weight: bold;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }

    h2 {
      font-size: 2rem;
      margin: 1rem 0;
      font-weight: normal;
    }

    p {
      font-size: 1.2rem;
      margin: 1rem 0 2rem 0;
      opacity: 0.9;
    }

    .home-button {
      background: #ff000038 ;
      color: white;
      border: none;
      padding: 12px 30px;
      font-size: 1.1rem;
      border-radius: 25px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-family: 'Formula1-Regular', sans-serif;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .home-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
      background: linear-gradient(45deg, #ee5a24, #ff6b6b);
    }

    .home-button:active {
      transform: translateY(0);
    }
  `]
})
export class NotFoundComponent {
  private navigationService = inject(NavigationService);

  goHome() {
    this.navigationService.goHome();
  }
}
