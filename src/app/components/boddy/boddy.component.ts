import { Component, inject, computed, signal, ChangeDetectionStrategy } from '@angular/core';
import { GlobalInfooService } from '../../services/globalInfoo.service';
import { Circuit, Pilot, Team, Tire } from '../../interfaces/interfaces';
import { TeamsTemplateComponent } from '../teams-template/teams-template.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-boddy',
  templateUrl: './boddy.component.html',
  styleUrls: ['./boddy.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TeamsTemplateComponent, RouterOutlet, HeaderComponent, FooterComponent]
})
export class BoddyComponent {

  private globalInfooService = inject(GlobalInfooService);

  // Signals para datos de la API
  circuits = signal<Circuit[]>([]);
  pilots = signal<Pilot[]>([]);
  teams = signal<Team[]>([]);
  tires = signal<Tire[]>([]);

  loading = this.globalInfooService.loadingSignal;
  error = this.globalInfooService.errorSignal;

/*   constructor(){
    effect(() => {
      if (this.error()) {
        console.warn('Se produjo un error:', this.error());
      }
      if (this.loading()) {
        console.log('Cargando datos...');
      }
    });
  } */


  // Computed signal para verificar si hay datos
  hasData = computed(() =>
    this.circuits().length > 0 ||
    this.pilots().length > 0 ||
    this.teams().length > 0 ||
    this.tires().length > 0
  );

  getCircuits() {
    this.globalInfooService.getCircuits().subscribe({
      next: (data) => {
        this.circuits.set(data);
        console.log('Circuits cargados:', data);
      },
      error: () => {
        alert('Error al cargar circuits');
      },
    });
  }

  getPilots() {

    this.globalInfooService.getPilots().subscribe({
      next: (data) => {
        this.pilots.set(data);
        console.log('Pilots cargados:', data);
      },
      error: () => {
        alert('Error al cargar pilots');
      },
    });
  }

  getTeams() {

    this.globalInfooService.getTeams().subscribe({
      next: (data) => {
        this.teams.set(data);
        console.log('Teams cargados:', data);
      },
      error: () => {
        alert('Error al cargar teams');
      },
    });
  }

  getTires() {

    this.globalInfooService.getTires().subscribe({
      next: (data) => {
        this.tires.set(data);
        console.log('Tires cargados:', data);
      },
      error: () => {
        alert('Error al cargar tires');
      },
    });
  }

}
