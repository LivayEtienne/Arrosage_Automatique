import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router'; // Importer Router

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
  userId!: string; // ID de l'utilisateur

  constructor(private fb: FormBuilder, 
              private userService: UserService, 
              private route: ActivatedRoute,
              private router: Router) {
    // Initialisation du formulaire
    this.userForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      adresse: ['', Validators.required],
      carteRfid: ['', Validators.required] // Ajout du champ carteRfid
    });
  }

  ngOnInit() {
    // Récupérer l'ID de l'utilisateur à partir de l'URL
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id')!;
      this.loadUserData();  // Charger les données de l'utilisateur
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
          carteRfid: data.carteRfid // Remplir le champ carteRfid
        });
      },
      (err) => {
        console.error("Erreur lors du chargement des données", err);
      }
    );
  }

  // Modifier un utilisateur
  updateItem() {
    if (this.userForm.valid) {
      this.userService.updateItem(this.userId, this.userForm.value).subscribe(
        (res) => {
          this.successMessage = 'Utilisateur modifié avec succès !';
          this.userForm.reset();  // Réinitialiser le formulaire après succès
        },
        (err) => {
          console.error(err);
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

  // Méthode pour gérer le scan de la carte RFID
  onRFIDScan(event: any) {
    // Récupérer l'ID de la carte scannée
    const rfidID = event.target.value;

    console.log('ID de la carte RFID capturé :', rfidID);

    // Met à jour le champ 'carteRfid' du formulaire avec l'ID de la carte RFID scannée
    this.userForm.get('carteRfid')?.setValue(rfidID);
  }
}