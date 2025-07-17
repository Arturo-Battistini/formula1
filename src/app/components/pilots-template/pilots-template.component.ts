import { Component, OnInit, inject, input, signal, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Pilot } from '../../interfaces/interfaces';
import { GlobalInfooService } from '../../services/globalInfoo.service';
import { TeamUtilsService } from '../../services/team-utils.service';
@Component({
  selector: 'app-pilots-template',
  templateUrl: './pilots-template.component.html',
  styleUrls: ['./pilots-template.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class PilotsTemplateComponent implements OnInit {
  // Signals para el estado del componente
  pilotName = signal<string | null>(null);
  pilotInfo = signal<Pilot | null>(null);
  pilots = signal<Pilot[]>([]);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  // Computed signals para derivar datos
  currentPilot = computed(() => this.pilotInfo() ?? null);

  // Arrays para las estadísticas
  seasonStats = computed(() => [
    { label: 'Victorias', value: this.currentPilot()?.raceWins, property: 'raceWins' },
    { label: 'Poles', value: this.currentPilot()?.polePositions, property: 'polePositions' }
  ]);

  pilotDetails = computed(() => [
    { label: 'Puntos en el campeonato', value: this.currentPilot()?.championshipPoints, property: 'championshipPoints' },
    { label: 'Podios', value: this.currentPilot()?.podiums, property: 'podiums' },
    { label: 'Nacionalidad', value: this.currentPilot()?.nationality, property: 'nationality' },
    { label: 'Vueltas rápidas', value: this.currentPilot()?.fastestLaps, property: 'fastestLaps' },
    { label: 'Fecha de nacimiento', value: this.currentPilot()?.dateOfBirth, property: 'dateOfBirth', isDate: true },
    { label: 'Color del Casco', value: this.currentPilot()?.helmetColor, property: 'helmetColor' }
  ]);

  sprintStats = computed(() => [
    { label: 'Victorias en Sprint', value: this.currentPilot()?.sprintWins, property: 'sprintWins' },
    { label: 'Poles en Sprint', value: this.currentPilot()?.sprintPolePositions, property: 'sprintPolePositions' },
    { label: 'Podios en Sprint', value: this.currentPilot()?.sprintPodiums, property: 'sprintPodiums' },
    { label: 'Puntos en Sprint', value: this.currentPilot()?.sprintPoints, property: 'sprintPoints' },
    { label: 'Vueltas rápidas en Sprint', value: this.currentPilot()?.sprintFastestLaps, property: 'sprintFastestLaps' },
    { label: 'Participaciones en Sprint', value: this.currentPilot()?.sprintParticipations, property: 'sprintParticipations' }
  ]);

  careerStats = computed(() => [
    { label: 'Victorias', value: '123' },
    { label: 'Poles', value: '45' },
    { label: 'Podios', value: '89' },
    { label: 'Puntos', value: '1250' },
    { label: 'Vueltas rápidas', value: '67' },
    { label: 'Participaciones', value: '200' },
    { label: 'Campeonatos', value: '3' },
    { label: 'Temporadas', value: '8' }
  ]);

  drivers = computed(() => {
    return this.pilots().map(pilot => ({
      firstName: pilot.name,
      lastName: pilot.surname,
      number: pilot.number,
      flag: pilot.nationality, // Asumiendo que nationality se usa como flag
      image: pilot.imageUrl,
      pilotName: pilot.currentTeam.name
    }));
  });

  teamBackground = input<string>('');
  teamCarImage = input<string>('');
  teamLogo = input<string>('');

  private route = inject(ActivatedRoute);
  private globalInfooService = inject(GlobalInfooService);
  private teamUtils = inject(TeamUtilsService);

    ngOnInit() {
    this.route.params.subscribe(params => {
      const pilotName = params['pilotName'];
      this.pilotName.set(pilotName);

      this.getInfoTeamAndPilots();
    });
  }

  getInfoTeamAndPilots() {
    const currentPilotName = this.pilotName();
    if (currentPilotName) {
      this.isLoading.set(true);
      this.error.set(null);

      // Usar forkJoin para ejecutar ambas llamadas en paralelo
      this.globalInfooService.getPilotsByName(this.pilotName() ?? '').subscribe({
        next: (result) => {
          // Asignar el piloto directamente
          this.pilotInfo.set(result);
          console.log('Piloto cargado:', this.pilotInfo());
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error al cargar datos del equipo:', error);
          this.error.set('Error al cargar datos del equipo');
          this.isLoading.set(false);
        }
      });
    }
  }
  getTeamBackgroundColor(pilotName: string): string {
    return this.teamUtils.getPilotBackgroundColor(pilotName);
  }

  getTeamPilotImage(pilotName: string): string {
    return this.teamUtils.getPilotImage(pilotName);
  }

}

