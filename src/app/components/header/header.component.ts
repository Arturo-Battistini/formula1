import { Component, inject, computed } from '@angular/core';
import { environment } from '../../environments/variables';
import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';
import { GlobalInfooService } from '../../services/globalInfoo.service';
import { Circuit, Pilot, Team, Tire } from '../../interfaces/interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [CommonModule ],
})
export class HeaderComponent     {
  headerTitles = environment.headerTitles;
  globalInfooService = inject(GlobalInfooService);

  pilots = signal<Pilot[]>([]);
  teams = signal<Team[]>([]);
  circuits = signal<Circuit[]>([]);
  tires = signal<Tire[]>([]);
  pilotsFiltrados = computed(() => this.pilots().map(pilot => pilot.name));
  activeMenu = signal<string | null>(null);

  // Signals para controlar el estado de carga de cada menú
  loadingPilots = signal<boolean>(false);
  loadingTeams = signal<boolean>(false);
  loadingCircuits = signal<boolean>(false);
  loadingTires = signal<boolean>(false);



  onMenuEnter(title: string) {
    // Si ya estamos en el mismo menú, no hacer nada
    if (this.activeMenu() === title) {
      return;
    }

    this.activeMenu.set(title);

    // Limpiar datos del menú anterior
    this.clearOtherMenusData(title);

    // Cargar datos según el menú seleccionado
    switch (title) {
      case 'Pilotos':
        this.loadPilots();
        break;
      case 'Equipos':
        this.loadTeams();
        break;
      case 'Circuitos':
        this.loadCircuits();
        break;
      case 'Neumáticos':
        this.loadTires();
        break;
    }
  }

  onDropdownEnter() {
    // Mantener el menú abierto cuando el mouse entra al dropdown
    // No hacer nada, solo mantener el estado actual
  }

  onMenuLeave() {
    /* this.activeMenu.set(null); */
  }

  private clearOtherMenusData(currentMenu: string) {
    // Limpiar datos y estados de carga de otros menús
    if (currentMenu !== 'Pilotos') {
      this.pilots.set([]);
      this.loadingPilots.set(false);
    }
    if (currentMenu !== 'Equipos') {
      this.teams.set([]);
      this.loadingTeams.set(false);
    }
    if (currentMenu !== 'Circuitos') {
      this.circuits.set([]);
      this.loadingCircuits.set(false);
    }
    if (currentMenu !== 'Neumáticos') {
      this.tires.set([]);
      this.loadingTires.set(false);
    }
  }

  private loadPilots() {
    // Solo cargar si no están ya cargados
    if (this.pilots().length === 0 && !this.loadingPilots()) {
      this.loadingPilots.set(true);
      this.globalInfooService.getPilots().subscribe({
        next: (data) => {
          this.pilots.set(data);
          this.loadingPilots.set(false);
          console.log('Pilots cargados:', this.pilots());
        },
        error: (error) => {
          console.error('Error cargando pilotos:', error);
          this.loadingPilots.set(false);
        }
      });
    }
  }

  private loadTeams() {
    // Solo cargar si no están ya cargados
    if (this.teams().length === 0 && !this.loadingTeams()) {
      this.loadingTeams.set(true);
      this.globalInfooService.getTeams().subscribe({
        next: (data) => {
          this.teams.set(data); // Solo primeros 4 equipos
          this.loadingTeams.set(false);
        },
        error: (error) => {
          console.error('Error cargando equipos:', error);
          this.loadingTeams.set(false);
        }
      });
    }
  }

  private loadCircuits() {
    // Solo cargar si no están ya cargados
    if (this.circuits().length === 0 && !this.loadingCircuits()) {
      this.loadingCircuits.set(true);
      this.globalInfooService.getCircuits().subscribe({
        next: (data) => {
          this.circuits.set(data); // Solo primeros 4 circuitos
          this.loadingCircuits.set(false);
        },
        error: (error) => {
          console.error('Error cargando circuitos:', error);
          this.loadingCircuits.set(false);
        }
      });
    }
  }

  private loadTires() {
    // Solo cargar si no están ya cargados
    if (this.tires().length === 0 && !this.loadingTires()) {
      this.loadingTires.set(true);
      this.globalInfooService.getTires().subscribe({
        next: (data) => {
          this.tires.set(data.slice(0, 4)); // Solo primeros 4 neumáticos
          this.loadingTires.set(false);
        },
        error: (error) => {
          console.error('Error cargando neumáticos:', error);
          this.loadingTires.set(false);
        }
      });
    }
  }

  getTeamBackgroundColor(teamName: string): string {
    const teamColors: Record<string, string> = {
      'alpine': '#005081',
      'aston martin': '#00482C',
      'ferrari': '#710006',
      'haas': '#4D5052',
      'kick sauber': '#006300',
      'mclaren': '#863400',
      'mercedes': '#007560',
      'racing bulls': '#2345AB',
      'red bull racing': '#003282',
      'williams': '#000681'
    };

    const normalizedName = teamName.toLowerCase().trim();
    return teamColors[normalizedName] || '#ffffff'; // Color por defecto si no se encuentra
  }
}
