import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';

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

  constructor(private fb: FormBuilder, private userService: UserService) {
    // Création du formulaire avec les validations
    this.userForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern('[0-9]{9,12}')]],
      adresse: ['', Validators.required],
      role: ['utilisateur', Validators.required],
      cardID: ['', Validators.required]
    });
  }

  // Fonction pour ajouter un utilisateur
  addUser() {
    if (this.userForm.valid) {
      this.userService.addUser(this.userForm.value).subscribe(
        (res) => {
          this.successMessage = 'Utilisateur ajouté avec succès !';
          this.userForm.reset(); // Réinitialiser le formulaire après succès
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }
}