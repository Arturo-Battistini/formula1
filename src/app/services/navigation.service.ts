import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private router = inject(Router);

  /**
   * Redirige al usuario a la página de inicio
   */
  goHome(): void {
    this.router.navigate(['/teams']);
  }

  /**
   * Redirige al usuario a la página de pilotos
   */
  goToPilots(): void {
    this.router.navigate(['/pilots']);
  }

  /**
   * Redirige al usuario a la página de equipos
   */
  goToTeams(): void {
    this.router.navigate(['/teams']);
  }

  /**
   * Redirige al usuario a la página 404
   */
  goToNotFound(): void {
    this.router.navigate(['/404']);
  }

  /**
   * Navega a un equipo específico
   */
  goToTeam(teamName: string): void {
    this.router.navigate(['/teams', teamName.toLowerCase()]);
  }

  /**
   * Navega a un piloto específico
   */
  goToPilot(pilotName: string, pilotSurname: string): void {
    const fullName = `${pilotName}-${pilotSurname}`.toLowerCase();
    this.router.navigate(['/pilots', fullName]);
  }

  /**
   * Valida si una URL es válida
   */
  isValidUrl(url: string): boolean {
    const validRoutes = [
      '/teams',
      '/pilots',
      '/circuits',
      '/tires'
    ];

    return validRoutes.some(validRoute =>
      url.startsWith(validRoute) || url === '/'
    );
  }

  /**
   * Obtiene la URL actual
   */
  getCurrentUrl(): string {
    return this.router.url;
  }
}
