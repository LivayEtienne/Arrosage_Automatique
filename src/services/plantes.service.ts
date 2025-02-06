import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Arrosage {
  heure: string;
  volumeEau: number;
  uniteVolume: string;
}
export interface PlantData {
  _id?: string;
  nom: string;
  category: string;
  photo: string;
  seuilHumidity: number;
  seuilLuminosity: number;
  volumeEau: number;
  eauUnit: string;
  arrosages?: Arrosage[]; // Ajoutez cette ligne
  programs?: any[]; // Ajoutez cette ligne
}

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  private apiUrl = 'http://localhost:5000/api/plants';

  constructor(private http: HttpClient) {}

  createPlant(plantData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, plantData);
  }

  getPlants(): Observable<PlantData[]> {
    return this.http.get<PlantData[]>(this.apiUrl);
  }

  getPlant(id: string): Observable<PlantData> {
    return this.http.get<PlantData>(`${this.apiUrl}/${id}`);
  }

  updatePlant(id: string, plantData: FormData): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, plantData);
  }

  deletePlant(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
