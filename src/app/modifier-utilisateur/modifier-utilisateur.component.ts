import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router'; // Importer Router
import { RfidService } from '../services/rfid.service'; // Importer le service RFID

@Component({
  selector: 'app-modifier-utilisateur',
  standalone: true,
  templateUrl: './modifier-utilisateur.component.html',
  styleUrls: ['./modifier-utilisateur.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class ModifierUtilisateurComponent implements OnInit {
  userForm: FormGroup;
  successMessage: string = '';
  phoneExistsMessage: string = '';  // Message d'erreur pour le téléphone existant
  rfidExistsMessage: string = '';   // Message d'erreur pour le Card ID existant
  userId!: string; // ID de l'utilisateur

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private rfidService: RfidService, // Injecter le service RFID
    private route: ActivatedRoute
  ) {
    // Initialiser le formulaire avec les champs nécessaires
    this.userForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      adresse: ['', Validators.required],
      carteRfid: ['', Validators.required]  // Champ carteRfid pour stocker l'ID scanné
    });
  }

  ngOnInit() {
    // Récupérer l'ID de l'utilisateur dans l'URL
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id')!;
      this.loadUserData();  // Charger les données de l'utilisateur
    });

    // Écoute les scans RFID et met à jour le champ carteRfid
    this.rfidService.onCardScanned().subscribe(cardID => {
      this.userForm.patchValue({ carteRfid: cardID });  // Mettre à jour carteRfid avec l'ID scanné
    });
  }

  // Charger les données de l'utilisateur depuis l'API
  loadUserData() {
    this.userService.getItemById(this.userId).subscribe(
      (data) => {
        // Remplir le formulaire avec les données existantes
        this.userForm.patchValue({
          nom: data.nom,
          prenom: data.prenom,
          telephone: data.telephone,
          adresse: data.adresse,
          carteRfid: data.carteRfid  // Remplir le champ carteRfid avec la valeur existante
        });
      },
      (err) => {
        console.error("Erreur lors du chargement des données", err);
      }
    );
  }

  // Modifier un utilisateur
  updateItem() {
    // Réinitialiser les messages d'erreur à chaque soumission
    this.phoneExistsMessage = '';
    this.rfidExistsMessage = '';

    if (this.userForm.valid) {
      this.userService.updateItem(this.userId, this.userForm.value).subscribe(
        (res) => {
          this.successMessage = 'Utilisateur modifié avec succès !';
          this.userForm.reset();  // Réinitialiser le formulaire après succès

          // Redirection vers la liste des utilisateurs après succès
          this.router.navigate(['/liste-utilisateur']);
        },
        (err) => {
          if (err.status === 400) {
            // Si l'erreur concerne un téléphone déjà existant
            if (err.error && err.error.message && err.error.message.includes('telephone')) {
              this.phoneExistsMessage = 'Le numéro de téléphone existe déjà.';
            }

            // Si l'erreur concerne un Card ID déjà existant
            if (err.error && err.error.message && err.error.message.includes('carteRfid')) {
              this.rfidExistsMessage = 'Le Card ID existe déjà.';
            }

            console.error(err);
          }
        }
      );
    }
  }

  // Restreindre la saisie aux chiffres uniquement
  restrictInput(event: any) {
    const input = event.target.value;
    const filtered = input.replace(/[^0-9]/g, ''); // Ne garder que les chiffres
    event.target.value = filtered;
  }

  // Méthode pour naviguer vers la liste des utilisateurs
  navigateToUserList() {
    this.router.navigate(['/liste-utilisateur']); // Redirection vers la liste des utilisateurs
  }
}
