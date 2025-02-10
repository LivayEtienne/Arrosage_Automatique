import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConnexionService } from '../services/connexion.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router'; // Import du Router

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule , HttpClientModule],
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})


export class ConnexionComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  cardId: string = '';  // Stocker l'ID RFID scanné ici
  cardScanSubscription: Subscription | null = null;


  constructor(private fb: FormBuilder, private connexionService: ConnexionService, private router: Router) {
    this.loginForm = this.fb.group({
      code1: ['', [Validators.required,Number, Validators.maxLength(1)]],
      code2: ['', [Validators.required,Number, Validators.maxLength(1)]],
      code3: ['', [Validators.required,Number, Validators.maxLength(1)]],
      code4: ['', [Validators.required, Number, Validators.maxLength(1)]]
    });
  }





  ngOnInit() {
    // Simulation du scan de carte RFID
    // Imaginons que ce service retourne un Observable de l'ID scanné
    this.cardScanSubscription = this.connexionService.getCardScans().subscribe({
      next: (scanData) => {
        console.log('Carte RFID scannée :', scanData.cardId);
        this.cardId = scanData.cardId;  // On récupère l'ID de la carte scannée
        //this.loginForm.patchValue({ carteRfid: this.cardId });  // On remplit le formulaire avec l'ID de la carte
        //this.onSubmit();  // On soumet le formulaire automatiquement
        const cardInput = document.getElementById('cardIdInput') as HTMLInputElement;
        if (cardInput) {
        cardInput.value = this.cardId;
        this.onSubmit1()
        }
      },
      error: (error) => {
        console.error('Erreur lors du scan RFID:', error);
      }
    });
  }
 

  ngOnDestroy() {
    // On se désabonne lorsque le composant est détruit
    if (this.cardScanSubscription) {
      this.cardScanSubscription.unsubscribe();
    }
  }





  // Gère le focus automatique
  moveFocus(currentInput: HTMLInputElement, nextInput: HTMLInputElement) {
    if (currentInput.value.length === 1) {
      nextInput.focus();
    }
  }

  // Gère le retour avec la touche backspace
  moveBack(currentInput: HTMLInputElement, prevInput: HTMLInputElement | null) {
    if (currentInput.value.length === 0 && prevInput) {
      prevInput.focus();
    }
  }

  // Soumission automatique après la dernière entrée
  onLastInput(lastInput: HTMLInputElement) {
    if (lastInput.value.length === 1) {
      this.onSubmit();
    }
  }



  onSubmit1() {
    const cardInput = document.getElementById('cardIdInput') as HTMLInputElement;
    if (!cardInput || !cardInput.value.trim()) {
      this.errorMessage = 'Veuillez scanner votre carte RFID.';
      return;
    }
  
    const cardIdValue = cardInput.value.trim();
    this.errorMessage = ''; // Réinitialisation des erreurs
  
    this.connexionService.login({ carteRfid: cardIdValue }).subscribe({
      next: (response) => {
        console.log('✅ Connexion réussie :', response);
        this.errorMessage = ''; // Réinitialiser les erreurs après succès
      },
      error: (error) => {
        console.error('❌ Erreur de connexion :', error);
        this.errorMessage = error.error?.msg || 'Erreur de connexion';
        const firstInput = document.querySelector('input[formControlName="code1"]') as HTMLInputElement;
        if (firstInput) {
          setTimeout(() => firstInput.focus(), 0);
        }
        
      }
    });
  }
  


  onSubmit() {
    if (this.loginForm.valid) {
      let codeSecret: string = Object.values(this.loginForm.value).join('');
      let codeSecretNumber: number = Number(codeSecret);
  
      this.errorMessage = ''; // Réinitialiser l'erreur
  
      this.connexionService.login({ codeSecret: codeSecretNumber }).subscribe({
        next: (response) => {
          console.log('Réponse serveur :', response);
          this.errorMessage = ''; // Réinitialiser l'erreur en cas de succès
  
          // Vérifier le rôle dans la réponse
          if (response.role === 'Utilisateur') {
            // Si le rôle est 'Admin', rediriger vers le dashboard
            this.router.navigate(['/dashutilisateur']);  // Remplacez '/dashboard' par le chemin correct de votre tableau de bord
          } else if (response.role === 'Super Admin') {
            // Si le rôle est 'Super Admin', rediriger vers un autre tableau de bord
            this.router.navigate(['/dashboard']);  // Remplacez '/super-admin-dashboard' par le chemin correct
          } else {
            // Si le rôle est inconnu, afficher un message d'erreur
            this.errorMessage = 'Rôle inconnu, impossible de rediriger.';
          }
        },
        error: (error) => {
          console.error('Erreur :', error);
          this.errorMessage = error.error?.msg || 'Erreur de connexion';
          this.loginForm.reset(); // Réinitialiser le formulaire
  
          const firstInput = document.querySelector('input[formControlName="code1"]') as HTMLInputElement;
          if (firstInput) {
            setTimeout(() => firstInput.focus(), 0);
          }
        }
      });
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs.';
    }
  }
  
}