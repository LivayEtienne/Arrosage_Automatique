import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router'; // Importer Router


@Component({
  selector: 'app-ajout-utilisateur',
  standalone: true,
  templateUrl: './ajout-utilisateur.component.html',
  styleUrls: ['./ajout-utilisateur.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class AjoutUtilisateurComponent {
  userForm: FormGroup;
  successMessage: string = '';

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    // Création du formulaire avec les validations
    this.userForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', [
        Validators.required, 
        Validators.pattern('^[0-9]{9}$') // Validation pour exactement 9 chiffres
      ]],
      adresse: ['', Validators.required],
      role: ['Utilisateur', Validators.required],
      carteRfid: ['', Validators.required]
    });
  }

  // Fonction pour ajouter un utilisateur
  addUser() {
    if (this.userForm.valid) {
      console.log('Données à envoyer:', this.userForm.value); // Vérifiez les données envoyées
      this.userService.createItem(this.userForm.value).subscribe(
        (res) => {
          this.successMessage = 'Utilisateur ajouté avec succès !';
          this.userForm.reset();
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }

  // Ajout dans le composant AjoutUtilisateurComponent

onRFIDScan(event: any) {
  // Récupérer l'ID de la carte scannée
  const rfidID = event.target.value;

  console.log('ID de la carte RFID capturé :', rfidID);

  // Met à jour le champ 'carteRfid' du formulaire avec l'ID de la carte RFID scannée, 
// permettant ainsi de stocker cette valeur pour la soumission du formulaire.
this.userForm.get('carteRfid')?.setValue(rfidID);
}

  // Méthode pour restreindre la saisie aux chiffres uniquement
  restrictInput(event: any) {
    const input = event.target.value;
    const filtered = input.replace(/[^0-9]/g, ''); // Remplace tout caractère non numérique par rien
    event.target.value = filtered;
  }

  // Méthode pour naviguer vers la liste des utilisateurs
  navigateToUserList() {
    this.router.navigate(['/liste-utilisateur']); // Redirection vers la liste des utilisateurs
}
}
