import { Component, OnInit, inject, input, signal, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Team, Pilot } from '../../interfaces/interfaces';
import { GlobalInfooService } from '../../services/globalInfoo.service';
import { forkJoin } from 'rxjs';

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

  getTeamDriverImages(teamName: string): { driver1: string, driver2: string } {
    // Mapeo de nombres de equipos a las imágenes de sus pilotos
    const teamDriverImages: Record<string, { driver1: string, driver2: string }> = {
      'alpine': {
        driver1: 'assets/teams/alpine/2025alpinepiegas01right.avif',
        driver2: 'assets/teams/alpine/2025alpinefracol01right.avif'
      },
      'aston martin': {
        driver1: 'assets/teams/aston/2025astonmartinlanstr01right.avif',
        driver2: 'assets/teams/aston/2025astonmartinferalo01right.avif'
        },
      'ferrari': {
        driver1: 'assets/teams/ferarri/2025ferrarichalec01right.avif',
        driver2: 'assets/teams/ferarri/2025ferrarilewham01right.avif'
      },
      'haas': {
        driver1: 'assets/teams/haas/2025haasolibea01right.avif',
        driver2: 'assets/teams/haas/2025haasestoco01right.avif'
      },
      'kick sauber': {
        driver1: 'assets/teams/sauber/2025kicksaubernichul01right.avif',
        driver2: 'assets/teams/sauber/2025kicksaubergabbor01right.avif'
      },
      'mclaren': {
        driver1: 'assets/teams/mclaren/2025mclarenoscpia01right.avif',
        driver2: 'assets/teams/mclaren/2025mclarenlannor01right.avif'
      },
      'mercedes': {
        driver1: 'assets/teams/mercedes/2025mercedesandant01right.avif',
        driver2: 'assets/teams/mercedes/2025mercedesgeorus01right.avif'
      },
      'racing bulls': {
        driver1: 'assets/teams/racingbull/2025racingbullsisahad01right.avif',
        driver2: 'assets/teams/racingbull/2025racingbullslialaw01right.avif'
      },
      'red bull racing': {
        driver1: 'assets/teams/redbull/2025redbullracingyuktsu01right.avif',
        driver2: 'assets/teams/redbull/2025redbullracingmaxver01right.avif'
      },
      'williams': {
        driver1: 'assets/teams/williams/2025williamscarsai01right.avif',
        driver2: 'assets/teams/williams/2025williamsalealb01right.avif'
      }
    };

    const normalizedName = teamName.toLowerCase().trim();
    const driverImages = teamDriverImages[normalizedName];

    if (driverImages) {
      return driverImages;
    }

    // Imágenes por defecto si no se encuentra el equipo
    return {
      driver1: 'assets/teams/alpine/2025alpinefracol01right.avif',
      driver2: 'assets/teams/alpine/2025alpinepiegas01right.avif'
    };
  }
}
