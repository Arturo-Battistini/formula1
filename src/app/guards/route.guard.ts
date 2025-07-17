import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { NavigationService } from '../services/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {

  private router = inject(Router);
  private navigationService = inject(NavigationService);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    // Obtener la URL actual
    const url = state.url;

    // Lista de rutas válidas
    const validRoutes = [
      '/teams',
      '/pilots',
      '/circuits',
      '/tires'
    ];

    // Verificar si la ruta actual es válida
    const isValidRoute = validRoutes.some(validRoute =>
      url.startsWith(validRoute) || url === '/'
    );

    // Si la ruta no es válida, redirigir al inicio
    if (!isValidRoute) {
      console.warn(`Ruta no válida detectada: ${url}. Redirigiendo al inicio.`);
      this.navigationService.goHome();
      return false;
    }

    return true;
  }
}
