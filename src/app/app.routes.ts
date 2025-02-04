import { Routes } from '@angular/router';
import { AjoutUtilisateurComponent } from './ajout-utilisateur/ajout-utilisateur.component';
import { DasboardComponent } from './dasboard/dasboard.component';
import { ModifierUtilisateurComponent } from './modifier-utilisateur/modifier-utilisateur.component';
import { ListeUtilisateurComponent } from './liste-utilisateur/liste-utilisateur.component'; // Assurez-vous que le chemin est correct

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Redirection par défaut
  { path: 'ajout-utilisateur', component: AjoutUtilisateurComponent },
  { path: 'modifier-utilisateur/:id', component: ModifierUtilisateurComponent }, // Route pour modifier un utilisateur par ID
  { path: 'dashboard', component: DasboardComponent }, // Route pour afficher le tableau de bord
  { path: 'liste-utilisateur', component: ListeUtilisateurComponent }, // Route pour afficher la liste des utilisateurs
];
