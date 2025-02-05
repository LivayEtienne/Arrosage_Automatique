import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConnexionService {
  private apiUrl = 'http://localhost:5000/api/items';

  constructor(private http: HttpClient) {}


  login(credentials: { carteRfid?: string; codeSecret?: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials, { 
      withCredentials: true 
    });
  }


  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { 
      withCredentials: true 
    });
  }
}


