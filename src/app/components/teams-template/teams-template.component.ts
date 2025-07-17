import { Component, OnInit, inject, input, signal, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Team, Pilot } from '../../interfaces/interfaces';
import { GlobalInfooService } from '../../services/globalInfoo.service';
import { forkJoin } from 'rxjs';
import { TeamUtilsService } from '../../services/team-utils.service';

@Component({
  selector: 'app-teams-template',
  templateUrl: './teams-template.component.html',
  styleUrls: ['./teams-template.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class TeamsTemplateComponent implements OnInit {
  // Signals para el estado del componente
  teamName = signal<string | null>(null);
  teamInfo = signal<Team | null>(null);
  pilots = signal<Pilot[]>([]);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  // Computed signals para derivar datos
  drivers = computed(() => {
    return this.pilots().map(pilot => ({
      firstName: pilot.name,
      lastName: pilot.surname,
      number: pilot.number,
      flag: pilot.nationality, // Asumiendo que nationality se usa como flag
      image: pilot.imageUrl,
      teamName: pilot.currentTeam.name
    }));
  });

  teamBackground = input<string>('');
  teamCarImage = input<string>('');
  teamLogo = input<string>('');

  private route = inject(ActivatedRoute);
  private globalInfooService = inject(GlobalInfooService);
  private router = inject(Router);
  private teamUtils = inject(TeamUtilsService);
    ngOnInit() {
    this.route.params.subscribe(params => {
      const teamName = params['teamName'];
      this.teamName.set(teamName);
      console.log('Equipo seleccionado:', teamName);

      this.getInfoTeamAndPilots();
    });
  }

  getInfoTeamAndPilots() {
    const currentTeamName = this.teamName();
    if (currentTeamName) {
      this.isLoading.set(true);
      this.error.set(null);

      // Usar forkJoin para ejecutar ambas llamadas en paralelo
      forkJoin({
        teams: this.globalInfooService.getTeamsByName(currentTeamName),
        pilots: this.globalInfooService.getPilotsByTeamName(currentTeamName)
      }).subscribe({
        next: (result) => {
          console.log('Equipo cargado:', result.teams);
          console.log('Pilotos cargados:', result.pilots);

          // Actualizar signals con los datos
          if (result.teams && result.teams.length > 0) {
            this.teamInfo.set(result.teams[0]);
          }
          if (result.pilots) {
            this.pilots.set(result.pilots);
          }
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
  getTeamBackgroundColor(teamName: string): string {
    return this.teamUtils.getTeamBackgroundColor3(teamName);
  }

    getTeamCarImage(teamName: string): string {
    // Mapeo de nombres de equipos a sus directorios y nombres de archivo específicos
    const teamImageMap: Record<string, { directory: string, filename: string }> = {
      'alpine': { directory: 'alpine', filename: '2025alpinecarright.avif' },
      'aston martin': { directory: 'aston', filename: '2025astonmartincarright.avif' },
      'ferrari': { directory: 'ferarri', filename: '2025ferraricarright.avif' },
      'haas': { directory: 'haas', filename: '2025haascarright.avif' },
      'kick sauber': { directory: 'sauber', filename: '2025kicksaubercarright.avif' },
      'mclaren': { directory: 'mclaren', filename: '2025mclarencarright.avif' },
      'mercedes': { directory: 'mercedes', filename: '2025mercedescarright.avif' },
      'racing bulls': { directory: 'racingbull', filename: '2025racingbullscarright.avif' },
      'red bull racing': { directory: 'redbull', filename: '2025redbullracingcarright.avif' },
      'williams': { directory: 'williams', filename: '2025williamscarright.avif' }
    };
    const normalizedName = teamName.toLowerCase().trim();
    const teamConfig = teamImageMap[normalizedName];

    if (teamConfig) {
      return `assets/teams/${teamConfig.directory}/${teamConfig.filename}`;
    }

    // Imagen por defecto si no se encuentra el equipo
    return 'assets/teams/alpine/2025alpinecarright.avif';
  }

  getPilotImage(pilot: Pilot): string {
    // Mapeo de pilotos específicos a sus imágenes
    const pilotImageMap: Record<string, string> = {
      // Alpine
      'pierre gasly': 'assets/teams/alpine/2025alpinepiegas01right.avif',
      'franco colapinto': 'assets/teams/alpine/2025alpinefracol01right.avif',

      // Aston Martin
      'lance stroll': 'assets/teams/aston/2025astonmartinlanstr01right.avif',
      'fernando alonso': 'assets/teams/aston/2025astonmartinferalo01right.avif',

      // Ferrari
      'charles leclerc': 'assets/teams/ferarri/2025ferrarichalec01right.avif',
      'lewis hamilton': 'assets/teams/ferarri/2025ferrarilewham01right.avif',

      // Haas
      'esteban ocon': 'assets/teams/haas/2025haasolibea01right.avif',
      'ollie bearman': 'assets/teams/haas/2025haasestoco01right.avif',

      // Kick Sauber
      'nico hulkenberg': 'assets/teams/sauber/2025kicksaubernichul01right.avif',
      'gabriel bortoleto': 'assets/teams/sauber/2025kicksaubergabbor01right.avif',

      // McLaren
      'oscar piastri': 'assets/teams/mclaren/2025mclarenoscpia01right.avif',
      'lando norris': 'assets/teams/mclaren/2025mclarenlannor01right.avif',

      // Mercedes
      'kimi antonelli': 'assets/teams/mercedes/2025mercedesandant01right.avif',
      'george russell': 'assets/teams/mercedes/2025mercedesgeorus01right.avif',

      // Racing Bulls
      'isack hadjar': 'assets/teams/racingbull/2025racingbullsisahad01right.avif',
      'liam lawson': 'assets/teams/racingbull/2025racingbullslialaw01right.avif',

      // Red Bull Racing
      'yuki tsunoda': 'assets/teams/redbull/2025redbullracingyuktsu01right.avif',
      'max verstappen': 'assets/teams/redbull/2025redbullracingmaxver01right.avif',

      // Williams
      'carlos sainz': 'assets/teams/williams/2025williamscarsai01right.avif',
      'alexander albon': 'assets/teams/williams/2025williamsalealb01right.avif'
    };

    const pilotKey = `${pilot.name} ${pilot.surname}`.toLowerCase();
    return pilotImageMap[pilotKey] || 'assets/teams/alpine/2025alpinefracol01right.avif';
  }
  onPilotClick(pilot: Pilot) {
    this.router.navigate(['/pilots', `${pilot.name}-${pilot.surname}`.toLowerCase()]);
  }
}
