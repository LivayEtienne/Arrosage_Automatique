import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Définir l'interface User
export interface Item {
  _id: string; // Assurez-vous que vous avez l'ID
  nom: string;
  prenom: string;
  telephone: number;
  adresse: string;
  status: boolean;
  role: string;
  selected?: boolean; // Propriété ajoutée pour la sélection
}

@Injectable({
  providedIn: 'root' // Permet d'injecter le service automatiquement dans l'application
})
export class UserService {
  public apiUrl = 'http://localhost:5000/api/items'; // Utilisez l'URL de votre backend

  constructor(private http: HttpClient) {}

  // Fonction pour ajouter un utilisateur
  createItem(user: Item): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  // Fonction pour récupérer un utilisateur par son ID
  getItemById(id: string): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/${id}`);
  }

  // Fonction pour modifier un utilisateur
  updateItem(id: string, updatedUserData: Item): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, updatedUserData);
  }

  // Fonction pour récupérer tous les utilisateurs
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  // Fonction pour supprimer un utilisateur par son ID
  deleteItem(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Fonction pour supprimer plusieurs utilisateurs
  deleteMultipleItems(ids: string[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/delete-multiple`, { ids });
  }

  // Fonction pour changer le statut d'un utilisateur
toggleItemStatus(id: string): Observable<Item> {
  return this.http.patch<Item>(`${this.apiUrl}/status/${id}`, {}); // Envoi d'une requête PATCH
}

// Fonction pour rechercher un utilisateur par numéro de téléphone
searchByPhoneNumber(phoneNumber: string): Observable<Item[]> {
  return this.http.get<Item[]>(`${this.apiUrl}/search?phoneNumber=${phoneNumber}`);
}
}