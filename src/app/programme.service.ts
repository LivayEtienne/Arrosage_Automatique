// programme.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



interface Arrosage {
    heure: string;
    volumeEau: number;
    uniteVolume: string;
  }
interface Program {
    _id: string;
    date: string;
    periode: string;
    nombreFois: number;
    arrosages: Arrosage[];
  }


@Injectable({
  providedIn: 'root'
})
export class ProgrammeService {

  private apiUrl = 'http://localhost:5000/api/programs'; // L'URL de ton backend

  constructor(private http: HttpClient) { }

   // Récupérer tous les programmes
   getPrograms(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Méthode pour récupérer les détails d'un programme par son ID
  getProgramById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  // Récupérer les programmes pour une plante spécifique
  getProgramsForPlant(plantId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/plant/${plantId}`);
  }

  // Ajouter une nouvelle programmation
  addProgram(program: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, program);
  }

  // Mettre à jour un programme
  updateProgram(id: string, program: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, program);
  }

  // Supprimer un programme
  deleteProgram(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

 
}