import { Routes } from '@angular/router';
import { AjoutUtilisateurComponent } from './ajout-utilisateur/ajout-utilisateur.component';
import { ModifierUtilisateurComponent } from './modifier-utilisateur/modifier-utilisateur.component';
import { ListeUtilisateurComponent } from './liste-utilisateur/liste-utilisateur.component'; // Assurez-vous que le chemin est correct

export const routes: Routes = [
  { path: 'ajout-utilisateur', component: AjoutUtilisateurComponent },
  { path: 'modifier-utilisateur/:id', component: ModifierUtilisateurComponent }, // Route pour modifier un utilisateur par ID
  { path: 'liste-utilisateur', component: ListeUtilisateurComponent }, // Route pour afficher la liste des utilisateurs
  { path: '', redirectTo: '/liste-utilisateur', pathMatch: 'full' }, // Redirection vers la liste des utilisateurs
  { path: '**', redirectTo: '/liste-utilisateur' } // Redirection de toutes les autres routes vers la liste des utilisateurs
];