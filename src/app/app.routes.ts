import { Routes } from '@angular/router';
import { AjoutUtilisateurComponent } from './ajout-utilisateur/ajout-utilisateur.component';
import { DasboardComponent } from './dasboard/dasboard.component';
import { ModifierUtilisateurComponent } from './modifier-utilisateur/modifier-utilisateur.component';
import { ListeUtilisateurComponent } from './liste-utilisateur/liste-utilisateur.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { DeconnexionComponent } from './deconnexion/deconnexion.component';
import { ArrosageComponent } from './arrosage/arrosage.component';

export const routes: Routes = [
  { path: '', redirectTo: 'connexion', pathMatch: 'full' }, // Redirection vers la connexion
  { path: 'connexion', component: ConnexionComponent }, // Ajout de la route connexion
  { path: 'ajout-utilisateur', component: AjoutUtilisateurComponent },
  { path: 'modifier-utilisateur/:id', component: ModifierUtilisateurComponent },
  { path: 'dashboard', component: DasboardComponent },
  {path: 'deconnexion', component: DeconnexionComponent},
  { path: 'liste-utilisateur', component: ListeUtilisateurComponent },
  { path: 'arrosage', component: ArrosageComponent }
];
