import { Component, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataLoaderService } from '../../../services/data-loader.service';
import { Pilot } from '../../../interfaces/interfaces';
import { TeamUtilsService } from '../../../services/team-utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true,
})
export class Home {
  private dataLoader = inject(DataLoaderService);
  private teamUtils = inject(TeamUtilsService);
  private router = inject(Router);
  pilots = computed(() => {
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

  loadingPilots = computed(() => this.dataLoader.loadingPilots());
  currentOffset = 0;
  visiblePilots = 8; // Máximo de pilotos visibles en desktop
  pilotWidth = 220; // Ancho aproximado de cada piloto (200px + 20px gap)

  constructor() {
    this.dataLoader.loadPilots();
    this.dataLoader.loadTeams();

    effect(() => {
      console.log('Pilots cargados:', this.pilots().length);
    });
  }

  nextSlide() {
    const maxOffset = this.getMaxOffset();
    const moveDistance = this.pilotWidth * 1.5; // Un piloto y medio
    this.currentOffset = Math.min(this.currentOffset + moveDistance, maxOffset);
  }

  prevSlide() {
    const moveDistance = this.pilotWidth * 1.5; // Un piloto y medio
    this.currentOffset = Math.max(this.currentOffset - moveDistance, 0);
  }

  getVisiblePilots(): Pilot[] {
    return this.pilots();
  }

  canGoNext(): boolean {
    return this.currentOffset < this.getMaxOffset();
  }

  canGoPrev(): boolean {
    return this.currentOffset > 0;
  }

  getMaxOffset(): number {
    const totalWidth = this.pilots().length * this.pilotWidth;
    const containerWidth = this.visiblePilots * this.pilotWidth;
    return Math.max(0, totalWidth - containerWidth);
  }

  getProgressPercentage(): number {
    const maxOffset = this.getMaxOffset();
    if (maxOffset === 0) return 100;
    return (this.currentOffset / maxOffset) * 100;
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.style.display = 'none';
    }
  }

  getTransformStyle(): string {
    return `translateX(-${this.currentOffset}px)`;
  }

  getPilotImage(pilotName: string): string {
    return this.teamUtils.getPilotImage(pilotName);
  }

  getTeamBackgroundColor2(pilotName: string): string {
    return this.teamUtils.getTeamBackgroundColor2(pilotName);
  }
  onPilotClick(pilot: Pilot) {
    this.router.navigate(['/pilots', `${pilot.name}-${pilot.surname}`.toLowerCase()]);
  }
}
