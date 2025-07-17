import { Component, inject, computed } from '@angular/core';
import { environment } from '../../environments/variables';
import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';
import { Pilot, Team } from '../../interfaces/interfaces';
import { Router } from '@angular/router';
import { DataLoaderService } from '../../services/data-loader.service';
import { TeamUtilsService } from '../../services/team-utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [CommonModule ],
})
export class HeaderComponent {
  headerTitles = environment.headerTitles;
  dataLoader = inject(DataLoaderService);
  teamUtils = inject(TeamUtilsService);
  router = inject(Router);
  activeMenu = signal<string | null>(null);

  get pilots() {
    return this.dataLoader.pilots;
  }

  get teams() {
    return this.dataLoader.teams;
  }

  get circuits() {
    return this.dataLoader.circuits;
  }

  get tires() {
    return this.dataLoader.tires;
  }

  get loadingPilots() {
    return this.dataLoader.loadingPilots;
  }

  get loadingTeams() {
    return this.dataLoader.loadingTeams;
  }

  get loadingCircuits() {
    return this.dataLoader.loadingCircuits;
  }

  get loadingTires() {
    return this.dataLoader.loadingTires;
  }

  pilotsFiltrados = computed(() => this.pilots().map(pilot => pilot.name));

  teamsFiltered = computed(() => {
    const teams = this.dataLoader.teams();
    return teams.sort((a, b) => b.championshipPoints - a.championshipPoints);
  });

  pilotsFiltered = computed(() => {
    const pilots = this.dataLoader.pilots();
    const teams = this.dataLoader.teams();

    // Ordenar equipos por puntos del campeonato
    const teamsOrdered = teams.sort((a, b) => b.championshipPoints - a.championshipPoints);

    // Crear un mapa con el orden de los equipos
    const teamOrderMap = new Map();
    teamsOrdered.forEach((team, index) => {
      teamOrderMap.set(team.name.toLowerCase(), index);
    });

    // Ordenar pilotos según el orden de sus equipos
    return pilots.sort((a, b) => {
      const teamAOrder = teamOrderMap.get(a.currentTeam.name.toLowerCase()) ?? 999;
      const teamBOrder = teamOrderMap.get(b.currentTeam.name.toLowerCase()) ?? 999;
      return teamAOrder - teamBOrder;
    });
  });



  onMenuEnter(title: string) {
    // Si ya estamos en el mismo menú, no hacer nada
    if (this.activeMenu() === title) {
      return;
    }

    this.activeMenu.set(title);

    // Cargar datos según el menú seleccionado (solo si no están ya cargados)
    switch (title) {
      case 'Pilotos':
        this.dataLoader.loadPilots();
        break;
      case 'Equipos':
        this.dataLoader.loadTeams();
        break;
      case 'Circuitos':
        this.dataLoader.loadCircuits();
        break;
      case 'Neumáticos':
        this.dataLoader.loadTires();
        break;
    }
  }

  onTeamClick(team: Team) {
    this.router.navigate(['/teams', team.name]);
    console.log(team.name);
  }

  onTitleClick(title: string) {
    switch (title) {
      case 'Pilotos':
        this.router.navigate(['/pilots']);
        break;
      case 'Equipos':
        this.router.navigate(['/teams']);
        break;
      case 'Circuitos':
        this.router.navigate(['/circuits']);
        break;
      case 'Neumáticos':
        this.router.navigate(['/tires']);
        break;
      default:
        // Para otros títulos, mantener el comportamiento por defecto
        break;
    }
    this.activeMenu.set(null); // Cerrar el menú después de navegar
  }

  onDropdownEnter() {
    // Mantener el menú abierto cuando el mouse entra al dropdown
    // No hacer nada, solo mantener el estado actual
  }

  onMenuLeave() {
    this.activeMenu.set(null);
  }



  getTeamBackgroundColor(teamName: string): string {
    return this.teamUtils.getTeamBackgroundColor(teamName);
  }

  onPilotClick(pilot: Pilot) {
    this.router.navigate(['/pilots', `${pilot.name}-${pilot.surname}`.toLowerCase()]);
  }

  getPilotImage(pilotName: string): string {
    return this.teamUtils.getPilotImage(pilotName);
  }

  home() {
    this.router.navigate(['/']);
  }

}
