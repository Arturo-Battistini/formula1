import { Injectable, signal } from '@angular/core';
import { Pilot, Team, Circuit, Tire } from '../interfaces/interfaces';
import { GlobalInfooService } from './globalInfoo.service';

@Injectable({
  providedIn: 'root'
})
export class DataLoaderService {
  private globalInfooService = new GlobalInfooService();

  // Signals para pilotos
  pilots = signal<Pilot[]>([]);
  loadingPilots = signal<boolean>(false);
  private pilotsLoadedAt = 0;

  // Signals para equipos
  teams = signal<Team[]>([]);
  loadingTeams = signal<boolean>(false);
  private teamsLoadedAt = 0;

  // Signals para circuitos
  circuits = signal<Circuit[]>([]);
  loadingCircuits = signal<boolean>(false);
  private circuitsLoadedAt = 0;

  // Signals para neumáticos
  tires = signal<Tire[]>([]);
  loadingTires = signal<boolean>(false);
  private tiresLoadedAt = 0;

  // Tiempo de caché en milisegundos (5 minutos)
  private readonly CACHE_DURATION = 5 * 60 * 1000;

  loadPilots() {
    const now = Date.now();
    const isCacheValid = this.pilots().length > 0 &&
                        (now - this.pilotsLoadedAt) < this.CACHE_DURATION;

    if (!isCacheValid && !this.loadingPilots()) {
      this.loadingPilots.set(true);
      this.globalInfooService.getPilots().subscribe({
        next: (data) => {
          this.pilots.set(data);
          this.pilotsLoadedAt = now;
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

  loadTeams() {
    const now = Date.now();
    const isCacheValid = this.teams().length > 0 &&
                        (now - this.teamsLoadedAt) < this.CACHE_DURATION;

    if (!isCacheValid && !this.loadingTeams()) {
      this.loadingTeams.set(true);
      this.globalInfooService.getTeams().subscribe({
        next: (data) => {
          this.teams.set(data);
          this.teamsLoadedAt = now;
          this.loadingTeams.set(false);
        },
        error: (error) => {
          console.error('Error cargando equipos:', error);
          this.loadingTeams.set(false);
        }
      });
    }
  }

  loadCircuits() {
    const now = Date.now();
    const isCacheValid = this.circuits().length > 0 &&
                        (now - this.circuitsLoadedAt) < this.CACHE_DURATION;

    if (!isCacheValid && !this.loadingCircuits()) {
      this.loadingCircuits.set(true);
      this.globalInfooService.getCircuits().subscribe({
        next: (data) => {
          this.circuits.set(data);
          this.circuitsLoadedAt = now;
          this.loadingCircuits.set(false);
        },
        error: (error) => {
          console.error('Error cargando circuitos:', error);
          this.loadingCircuits.set(false);
        }
      });
    }
  }

  loadTires() {
    const now = Date.now();
    const isCacheValid = this.tires().length > 0 &&
                        (now - this.tiresLoadedAt) < this.CACHE_DURATION;

    if (!isCacheValid && !this.loadingTires()) {
      this.loadingTires.set(true);
      this.globalInfooService.getTires().subscribe({
        next: (data) => {
          this.tires.set(data.slice(0, 4));
          this.tiresLoadedAt = now;
          this.loadingTires.set(false);
        },
        error: (error) => {
          console.error('Error cargando neumáticos:', error);
          this.loadingTires.set(false);
        }
      });
    }
  }

  clearPilots() {
    this.pilots.set([]);
    this.pilotsLoadedAt = 0;
    this.loadingPilots.set(false);
  }

  clearTeams() {
    this.teams.set([]);
    this.teamsLoadedAt = 0;
    this.loadingTeams.set(false);
  }

  clearCircuits() {
    this.circuits.set([]);
    this.circuitsLoadedAt = 0;
    this.loadingCircuits.set(false);
  }

  clearTires() {
    this.tires.set([]);
    this.tiresLoadedAt = 0;
    this.loadingTires.set(false);
  }
}
