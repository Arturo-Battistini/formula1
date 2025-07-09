import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Circuit, Pilot, Team, Tire } from '../interfaces/interfaces';
import { environment } from '../environments/variables';

@Injectable({
  providedIn: 'root'
})
export class GlobalInfooService {
  private baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  // Signals para manejar estado de error y carga
  errorSignal = signal<string | null>(null);
  loadingSignal = signal<boolean>(false);


  // Método para limpiar errores
  clearError() {
    this.errorSignal.set(null);
  }

  // Métodos del servicio con manejo de errores moderno
  getCircuits(): Observable<Circuit[]> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    return this.http.get<Circuit[]>(`${this.baseUrl}circuits`).pipe(
      tap(() => this.loadingSignal.set(false)),
      catchError((err) => {
        this.errorSignal.set('Error cargando circuitos');
        this.loadingSignal.set(false);
        return throwError(() => err);
      })
    );
  }

  getPilots(): Observable<Pilot[]> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    return this.http.get<Pilot[]>(`${this.baseUrl}pilots`).pipe(
      tap(() => this.loadingSignal.set(false)),
      catchError((err) => {
        this.errorSignal.set('Error cargando pilotos');
        this.loadingSignal.set(false);
        return throwError(() => err);
      })
    );
  }
  getPilotsByTeamName(teamName: string): Observable<Pilot[]> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    return this.http.get<Pilot[]>(`${this.baseUrl}pilots/team/${teamName}`).pipe(
      tap(() => this.loadingSignal.set(false)),
      catchError((err) => {
        this.errorSignal.set('Error cargando pilotos');
        this.loadingSignal.set(false);
        return throwError(() => err);
      })
    );
  }

  getTeams(): Observable<Team[]> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    return this.http.get<Team[]>(`${this.baseUrl}teams`).pipe(
      tap(() => this.loadingSignal.set(false)),
      catchError((err) => {
        this.errorSignal.set('Error cargando equipos');
        this.loadingSignal.set(false);
        return throwError(() => err);
      })
    );
  }
  getTeamsByName(teamName: string): Observable<Team[]> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    return this.http.get<Team[]>(`${this.baseUrl}teams/name/${teamName}`).pipe(
      tap(() => this.loadingSignal.set(false)),
      catchError((err) => {
        this.errorSignal.set('Error cargando equipos');
        this.loadingSignal.set(false);
        return throwError(() => err);
      })
    );
  }

  getTires(): Observable<Tire[]> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    return this.http.get<Tire[]>(`${this.baseUrl}tires`).pipe(
      tap(() => this.loadingSignal.set(false)),
      catchError((err) => {
        this.errorSignal.set('Error cargando neumáticos');
        this.loadingSignal.set(false);
        return throwError(() => err);
      })
    );
  }

}
