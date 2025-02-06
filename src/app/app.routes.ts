import { RouterModule, Routes } from '@angular/router';
import { ArrosageComponent } from './pages/arrosage/arrosage.component';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' }, // Redirection vers arrosage par défaut
  { path: 'arrosage', component: ArrosageComponent },
  // Ajoutez d'autres routes ici si nécessaire
];
