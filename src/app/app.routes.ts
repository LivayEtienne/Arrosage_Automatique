import { Routes } from '@angular/router';
import { AjoutUtilisateurComponent } from './ajout-utilisateur/ajout-utilisateur.component';

export const routes: Routes = [
  { path: 'ajout-utilisateur', component: AjoutUtilisateurComponent },
  { path: '', redirectTo: '/ajout-utilisateur', pathMatch: 'full' },
  { path: '**', redirectTo: '/ajout-utilisateur' } // Redirection de toutes les autres routes vers /ajout-utilisateur
];
