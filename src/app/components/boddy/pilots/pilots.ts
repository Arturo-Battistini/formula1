import { Component, computed, effect, inject } from '@angular/core';
import { Pilot } from '../../../interfaces/interfaces';
import { Router } from '@angular/router';
import { DataLoaderService } from '../../../services/data-loader.service';
import { TeamUtilsService } from '../../../services/team-utils.service';

@Component({
  selector: 'app-pilots',
  standalone: true,
  imports: [],
  templateUrl: './pilots.html',
  styleUrl: './pilots.css',
})
export class Pilots {
  dataLoader = inject(DataLoaderService);
  teamUtils = inject(TeamUtilsService);
  router = inject(Router);

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

  constructor() {
    this.dataLoader.loadPilots();
    this.dataLoader.loadTeams();
    effect(() => {
      console.log(this.dataLoader.pilots());
    });
  }

  getTeamBackgroundColor2(pilotName: string): string {
    return this.teamUtils.getTeamBackgroundColor2(pilotName);
  }

  get pilots() {
    return this.dataLoader.pilots;
  }

  get loadingPilots() {
    return this.dataLoader.loadingPilots;
  }

  onPilotClick(pilot: Pilot) {
    this.router.navigate(['/pilots', `${pilot.name}-${pilot.surname}`.toLowerCase()]);
  }

  getTeamBackgroundColor(teamName: string): string {
    return this.teamUtils.getTeamBackgroundColor(teamName);
  }

  getPilotImage(pilotName: string): string {
    return this.teamUtils.getPilotImage(pilotName);
  }
}
