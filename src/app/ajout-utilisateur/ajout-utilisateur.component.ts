import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { RfidService } from '../services/rfid.service'; // Importer le service RFID

@Component({
  selector: 'app-ajout-utilisateur',
  standalone: true,
  templateUrl: './ajout-utilisateur.component.html',
  styleUrls: ['./ajout-utilisateur.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class AjoutUtilisateurComponent implements OnInit {
  userForm: FormGroup;
  successMessage: string = '';
  phoneExistsMessage: string = '';
  rfidExistsMessage: string = '';

  constructor(
    private fb: FormBuilder, 
    private userService: UserService, 
    private router: Router,
    private rfidService: RfidService // Injecter le service RFID
  ) {
    this.userForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', [
        Validators.required, 
        Validators.pattern('^[0-9]{9}$')
      ]],
      adresse: ['', Validators.required],
      role: ['Utilisateur', Validators.required],
      carteRfid: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Écoute les scans RFID et met à jour le champ carteRfid
    this.rfidService.onCardScanned().subscribe(cardID => {
      this.userForm.patchValue({ carteRfid: cardID });
    });
  }

  addUser() {
    // Réinitialiser les messages d'erreur à chaque soumission
    this.phoneExistsMessage = '';
    this.rfidExistsMessage = '';

    if (this.userForm.valid) {
      this.userService.createItem(this.userForm.value).subscribe(
        (res) => {
          const codeSecret = res.codeSecret;
          this.successMessage = `Utilisateur ajouté avec succès ! Code Secret : ${codeSecret}`;
          this.userForm.reset();
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

  restrictInput(event: any) {
    const input = event.target.value;
    const filtered = input.replace(/[^0-9]/g, '');
    event.target.value = filtered;
  }

  navigateToUserList() {
    this.router.navigate(['/liste-utilisateur']);
  }

  closeModal() {
    this.successMessage = '';
  }

  
}