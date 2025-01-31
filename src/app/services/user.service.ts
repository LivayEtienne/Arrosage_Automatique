import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Permet d'injecter le service automatiquement dans l'application
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users'; // Remplace avec l'URL de ton backend

  constructor(private http: HttpClient) {}

  addUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
}
