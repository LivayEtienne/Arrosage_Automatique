import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueService {
  private apiUrl = 'http://localhost:3000/api/programs'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) {}

  getArrosages(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}