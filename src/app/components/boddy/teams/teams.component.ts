import { Component, computed, inject } from '@angular/core';
import { Team, Pilot } from '../../../interfaces/interfaces';
import { Router } from '@angular/router';
import { DataLoaderService } from '../../../services/data-loader.service';
import { TeamUtilsService } from '../../../services/team-utils.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
  standalone: true,
})
export class TeamsComponent {
  dataLoader = inject(DataLoaderService);
  teamUtils = inject(TeamUtilsService);
  router = inject(Router);
  teamsFiltered = computed(  () => {
    const teams = this.dataLoader.teams();
    return teams.sort((a, b) => b.championshipPoints - a.championshipPoints); /* creo un nuevo array con los equipos ordenados por puntos de la temporada */
  });
  constructor() {
    this.dataLoader.loadTeams();
    this.dataLoader.loadPilots();

  }

  getTeamBackgroundColor2(teamName: string): string {
    const teamColors: Record<string, string> = {
      'alpine': 'linear-gradient(to bottom, #007ab8, #005081, #002b40)',
      'aston martin': 'linear-gradient(to bottom, #00482C, #003320, #001a10)',
      'ferrari': 'linear-gradient(to bottom, #710006, #5a0005, #3d0003)',
      'haas': 'linear-gradient(to bottom, #4D5052, #3a3d3f, #2a2c2e)',
      'kick sauber': 'linear-gradient(to bottom, #006300, #004d00, #003300)',
      'mclaren': 'linear-gradient(to bottom, #863400, #6b2a00, #4d1e00)',
      'mercedes': 'linear-gradient(to bottom, #C8CCCE, #565F64, #000000)',
      'racing bulls': 'linear-gradient(to bottom, #2345AB, #1c3789, #142667)',
      'red bull racing': 'linear-gradient(to bottom, #003282, #002666, #001a4a)',
      'williams': 'linear-gradient(to bottom, #000681, #000566, #00034a)'
    };
    const normalizedName = teamName.toLowerCase().trim();
    return teamColors[normalizedName] || 'transparent'; // Color por defecto si no se encuentra
  }

  get teams() {
    return this.dataLoader.teams;
  }

  get loadingTeams() {
    return this.dataLoader.loadingTeams;
  }

  get pilots() {
    return this.dataLoader.pilots;
  }

  onTeamClick(team: Team) {
    this.router.navigate(['/teams', team.name.toLowerCase()]);
  }

  getTeamBackgroundColor(teamName: string): string {
    return this.teamUtils.getTeamBackgroundColor(teamName);
  }

    getPilotsForTeam(teamName: string): Pilot[] {
    return this.dataLoader.pilots().filter(pilot =>
      pilot.currentTeam.name.toLowerCase() === teamName.toLowerCase()
    );
  }

  getPilotImage(pilotName: string): string {
    return this.teamUtils.getPilotImage(pilotName);
  }
}
