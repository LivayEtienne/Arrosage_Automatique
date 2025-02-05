import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConnexionService } from '../services/connexion.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

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

  constructor(private fb: FormBuilder, private connexionService: ConnexionService) {
    this.loginForm = this.fb.group({
      code1: ['', [Validators.required,Number, Validators.maxLength(1)]],
      code2: ['', [Validators.required,Number, Validators.maxLength(1)]],
      code3: ['', [Validators.required,Number, Validators.maxLength(1)]],
      code4: ['', [Validators.required, Number, Validators.maxLength(1)]]
    });
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

  onSubmit() {
    if (this.loginForm.valid) {
      let codeSecret: string = Object.values(this.loginForm.value).join('');
      let codeSecretNumber: number = Number(codeSecret);

      this.errorMessage = ''; // Réinitialiser l'erreur

      this.connexionService.login({ codeSecret: codeSecretNumber }).subscribe({
        next: (response) => {
          console.log('Réponse serveur :', response);
          this.errorMessage = ''; // Réinitialiser l'erreur en cas de succès
        },
        error: (error) => {
          console.error('Erreur :', error);
          this.errorMessage = error.error.msg || 'Erreur de connexion';
          this.loginForm.reset(); // Réinitialiser le formulaire
        }
      });
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs.';
    }
  }
}
