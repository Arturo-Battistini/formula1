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
      'mercedes': 'linear-gradient(to bottom, #007560, #005a47, #003d30)',
      'racing bulls': 'linear-gradient(to bottom, #2345AB, #1c3789, #142667)',
      'red bull racing': 'linear-gradient(to bottom, #003282, #002666, #001a4a)',
      'williams': 'linear-gradient(to bottom, #000681, #000566, #00034a)'
    };
    const normalizedName = teamName.toLowerCase().trim();
    return teamColors[normalizedName] || 'transparent'; // Color por defecto si no se encuentra
  }
}
