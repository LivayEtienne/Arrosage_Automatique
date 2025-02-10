import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RfidService {
  private socket = io('http://localhost:5000'); // Mets l'URL de ton backend

  constructor() {}

  onCardScanned(): Observable<string> {
    return new Observable(observer => {
      this.socket.on('rfid-scanned', (cardID: string) => {
        observer.next(cardID);
      });
    });
  }
}