// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5000/api/items'; // Assurez-vous que c'est le bon chemin API pour la déconnexion

  constructor(private http: HttpClient) { }

  // Fonction de déconnexion
  logout(): Observable<any> {
    return this.http.post('http://localhost:5000/api/items/logout', {}, { withCredentials: true });
  }
  
}
