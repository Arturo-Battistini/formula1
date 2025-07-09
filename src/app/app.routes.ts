import { Routes } from '@angular/router';
import { TeamsTemplateComponent } from './components/teams-template/teams-template.component';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'teams', component: TeamsTemplateComponent }, // Página principal temporal
  { path: 'teams/:teamName', component: TeamsTemplateComponent },
];
