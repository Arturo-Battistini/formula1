import { Component, OnInit, inject, input, signal, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Pilot } from '../../interfaces/interfaces';
import { GlobalInfooService } from '../../services/globalInfoo.service';
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
    const teamColors: Record<string, string> = {
      'franco-colapinto': 'linear-gradient(to bottom, #007ab8, #005081, #002b40)',
      'pierre-gasly': 'linear-gradient(to bottom, #007ab8, #005081, #002b40)',
      'fernando-alonso': 'linear-gradient(to bottom, #00482C, #003320, #001a10)',
      'lance-stroll': 'linear-gradient(to bottom, #00482C, #003320, #001a10)',
      'lewis-hamilton': 'linear-gradient(to bottom, #710006, #5a0005, #3d0003)',
      'charles-leclerc': 'linear-gradient(to bottom, #710006, #5a0005, #3d0003)',
      'esteban-ocon': 'linear-gradient(to bottom, #4D5052, #3a3d3f, #2a2c2e)',
      'ollie-bearman': 'linear-gradient(to bottom, #4D5052, #3a3d3f, #2a2c2e)',
      'nico-hulkenberg': 'linear-gradient(to bottom, #006300, #004d00, #003300)',
      'gabriel-bortoleto': 'linear-gradient(to bottom, #006300, #004d00, #003300)',
      'oscar-piastri': 'linear-gradient(to bottom, #863400, #6b2a00, #4d1e00)',
      'lando-norris': 'linear-gradient(to bottom, #863400, #6b2a00, #4d1e00)',
      'kimi-antonelli': 'linear-gradient(to bottom, #C8CCCE, #565F64, #000000)',
      'george-russell': 'linear-gradient(to bottom, #C8CCCE, #565F64, #000000)',
      'liam-lawson': 'linear-gradient(to bottom, #2345AB, #1c3789, #142667)',
      'isack-hadjar': 'linear-gradient(to bottom, #2345AB, #1c3789, #142667)',
      'max-verstappen': 'linear-gradient(to bottom, #003282, #002666, #001a4a)',
      'yuki-tsunoda': 'linear-gradient(to bottom, #003282, #002666, #001a4a)',
      'alexander-albon': 'linear-gradient(to bottom, #000681, #000566, #00034a)',
      'carlos-sainz': 'linear-gradient(to bottom, #000681, #000566, #00034a)'
    };
    const normalizedName = pilotName.toLowerCase().trim();
    return teamColors[normalizedName] || 'transparent'; // Color por defecto si no se encuentra
  }

  getTeamPilotImage(pilotName: string): string {
    // Mapeo de nombres de pilotos a sus imágenes específicas
    const pilotImageMap: Record<string, { directory: string, filename: string }> = {
      'franco-colapinto': { directory: 'alpine', filename: '2025alpinefracol01right.avif' },
      'pierre-gasly': { directory: 'alpine', filename: '2025alpinepiegas01right.avif' },
      'fernando-alonso': { directory: 'aston', filename: '2025astonmartinferalo01right.avif' },
      'lance-stroll': { directory: 'aston', filename: '2025astonmartinlanstr01right.avif' },
      'lewis-hamilton': { directory: 'ferarri', filename: '2025ferrarilewham01right.avif' },
      'charles-leclerc': { directory: 'ferarri', filename: '2025ferrarichalec01right.avif' },
      'esteban-ocon': { directory: 'haas', filename: '2025haasestoco01right.avif' },
      'ollie-bearman': { directory: 'haas', filename: '2025haasolibea01right.avif' },
      'nico-hulkenberg': { directory: 'sauber', filename: '2025kicksaubernichul01right.avif' },
      'gabriel-bortoleto': { directory: 'sauber', filename: '2025kicksaubergabbor01right.avif' },
      'oscar-piastri': { directory: 'mclaren', filename: '2025mclarenoscpia01right.avif' },
      'lando-norris': { directory: 'mclaren', filename: '2025mclarenlannor01right.avif' },
      'kimi-antonelli': { directory: 'mercedes', filename: '2025mercedesandant01right.avif' },
      'george-russell': { directory: 'mercedes', filename: '2025mercedesgeorus01right.avif' },
      'liam-lawson': { directory: 'racingbull', filename: '2025racingbullslialaw01right.avif' },
      'isack-hadjar': { directory: 'racingbull', filename: '2025racingbullsisahad01right.avif' },
      'max-verstappen': { directory: 'redbull', filename: '2025redbullracingmaxver01right.avif' },
      'yuki-tsunoda': { directory: 'redbull', filename: '2025redbullracingyuktsu01right.avif' },
      'alexander-albon': { directory: 'williams', filename: '2025williamsalealb01right.avif' },
      'carlos-sainz': { directory: 'williams', filename: '2025williamscarsai01right.avif' }
    };
    const normalizedName = pilotName.toLowerCase().trim();
    const pilotConfig = pilotImageMap[normalizedName];

    if (pilotConfig) {
      return `assets/teams/${pilotConfig.directory}/${pilotConfig.filename}`;
    }

    // Imagen por defecto si no se encuentra el piloto
    return 'assets/teams/mercedes/2025mercedesgeorus01right.avif';
  }

}

