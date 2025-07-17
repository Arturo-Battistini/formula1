import { Routes } from '@angular/router';
import { TeamsTemplateComponent } from './components/teams-template/teams-template.component';
import { PilotsTemplateComponent } from './components/pilots-template/pilots-template.component';
import { Pilots } from './components/boddy/pilots/pilots';
import { TeamsComponent } from './components/boddy/teams/teams.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RouteGuard } from './guards/route.guard';
import { ParamGuard } from './guards/param.guard';
import { Home } from './components/boddy/home/home';

export const routes: Routes = [
  { path: '', component: Home },
    // Rutas protegidas con guard
  {
    path: 'teams',
    component: TeamsComponent,
    canActivate: [RouteGuard]
  },
  {
    path: 'teams/:teamName',
    component: TeamsTemplateComponent,
    canActivate: [RouteGuard, ParamGuard]
  },
  {
    path: 'pilots',
    component: Pilots,
    canActivate: [RouteGuard]
  },
  {
    path: 'pilots/:pilotName',
    component: PilotsTemplateComponent,
    canActivate: [RouteGuard, ParamGuard]
  },

  // Rutas para futuras secciones
  {
    path: 'circuits',
    component: TeamsComponent, // Temporal - cambiar por componente real
    canActivate: [RouteGuard]
  },
  {
    path: 'tires',
    component: TeamsComponent, // Temporal - cambiar por componente real
    canActivate: [RouteGuard]
  },

  // Ruta 404 - debe ir al final
  { path: '**', component: NotFoundComponent }
];
