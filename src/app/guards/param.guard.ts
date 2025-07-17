import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DataLoaderService } from '../services/data-loader.service';
import { NavigationService } from '../services/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class ParamGuard implements CanActivate {

  private router = inject(Router);
  private dataLoader = inject(DataLoaderService);
  private navigationService = inject(NavigationService);

  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    const paramName = route.paramMap.get('teamName') || route.paramMap.get('pilotName');

    if (!paramName) {
      return true; // No hay parámetro que validar
    }

    // Validar parámetros de equipos
    if (route.paramMap.has('teamName')) {
      return this.validateTeamName(paramName);
    }

    // Validar parámetros de pilotos
    if (route.paramMap.has('pilotName')) {
      return this.validatePilotName(paramName);
    }

    return true;
  }

  private validateTeamName(teamName: string): boolean {
    const validTeamNames = [
      'alpine',
      'aston martin',
      'ferrari',
      'haas',
      'kick sauber',
      'mclaren',
      'mercedes',
      'racing bulls',
      'red bull racing',
      'williams'
    ];

    const isValid = validTeamNames.includes(teamName.toLowerCase());

    if (!isValid) {
      console.warn(`Nombre de equipo no válido: ${teamName}. Redirigiendo al inicio.`);
      this.navigationService.goHome();
      return false;
    }

    return true;
  }

  private validatePilotName(pilotName: string): boolean {
    const validPilotNames = [
      'franco-colapinto',
      'pierre-gasly',
      'fernando-alonso',
      'lance-stroll',
      'lewis-hamilton',
      'charles-leclerc',
      'esteban-ocon',
      'ollie-bearman',
      'nico-hulkenberg',
      'gabriel-bortoleto',
      'oscar-piastri',
      'lando-norris',
      'kimi-antonelli',
      'george-russell',
      'liam-lawson',
      'isack-hadjar',
      'max-verstappen',
      'yuki-tsunoda',
      'alexander-albon',
      'carlos-sainz'
    ];

    const isValid = validPilotNames.includes(pilotName.toLowerCase());

    if (!isValid) {
      console.warn(`Nombre de piloto no válido: ${pilotName}. Redirigiendo a pilotos.`);
      this.navigationService.goToPilots();
      return false;
    }

    return true;
  }
}
