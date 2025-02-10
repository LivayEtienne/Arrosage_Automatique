import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SensorDataService {
  // L'URL de votre serveur WebSocket
  private socketUrl = 'ws://192.168.1.62:3000'; // L'adresse WebSocket de votre serveur Node.js

  private socket: any;

  constructor() {
    // Créez la connexion WebSocket
    this.socket = webSocket(this.socketUrl);
  }

  // Méthode pour récupérer les données en temps réel via WebSocket
  getData(): Observable<any> {
    return this.socket.asObservable();
  }

  // Méthode pour envoyer des messages au serveur WebSocket (si nécessaire)
  sendMessage(message: any): void {
    this.socket.next(message);
  }

  // Vous pouvez également fermer la connexion WebSocket lorsque le composant est détruit
  closeConnection(): void {
    this.socket.complete();
  }
}
