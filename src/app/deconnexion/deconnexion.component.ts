import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; // Assurez-vous que le chemin est correct
import { Router } from '@angular/router';

@Component({
  selector: 'app-deconnexion',
  standalone: true,
  templateUrl: './deconnexion.component.html',
  styleUrls: ['./deconnexion.component.css']
})
export class DeconnexionComponent {

  constructor(private authService: AuthService, private router: Router) { }

  // Fonction pour déconnecter l'utilisateur
  onLogout() {
    this.authService.logout().subscribe(
      response => {
        console.log('Déconnexion réussie');
        // Attendez quelques secondes avant de rediriger
        setTimeout(() => {
          this.router.navigate(['/connexion']);
        }, 1000);  // Attendre 1 seconde avant la redirection
      },
      error => {
        console.error('Erreur de déconnexion', error);
        alert('Erreur de déconnexion. Veuillez réessayer.');
      }
    );
  }
  
}
