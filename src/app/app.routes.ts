import { Routes } from '@angular/router';
import { TeamsTemplateComponent } from './components/teams-template/teams-template.component';
import { PilotsTemplateComponent } from './components/pilots-template/pilots-template.component';

export const routes: Routes = [
  { path: '', redirectTo: 'teams', pathMatch: 'full' },
  { path: 'teams', component: TeamsTemplateComponent }, // Página principal temporal
  { path: 'teams/:teamName', component: TeamsTemplateComponent },
  { path: 'pilots/:pilotName', component: PilotsTemplateComponent },
  { path: 'pilots', component: PilotsTemplateComponent },
];
