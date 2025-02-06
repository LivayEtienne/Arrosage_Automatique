import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { io, Socket } from 'socket.io-client';
import { isPlatformBrowser } from '@angular/common';

// Interfaces
export interface CardScanData {
  cardId: string;
}

export interface CardError {
  cardId: string;
  message: string;
  code?: number;
}

export interface LoginResponse {
  status: boolean;
  message: string;
  data?: any;
}

export interface LoginCredentials {
  carteRfid?: string;
  codeSecret?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {
  private apiUrl = 'http://localhost:5000/api/items';
  private socket!: Socket;
  private isBrowser: boolean;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId); // Vérifie si on est côté navigateur

    if (this.isBrowser) {
      this.initializeSocket();
    }
  }

  private initializeSocket(): void {
    try {
      this.socket = io('http://localhost:5000', {
        transports: ['websocket'],
        autoConnect: true,
        reconnection: true
      });

      this.socket.on('connect', () => console.log('✅ Socket connecté'));
      this.socket.on('disconnect', () => console.log('⚠️ Socket déconnecté'));
    } catch (error) {
      console.error('🚨 Erreur d’initialisation de Socket.IO:', error);
    }
  }

  /** Connexion utilisateur */
  login(credentials: LoginCredentials): Observable<LoginResponse> {
    console.log('🔄 Tentative de connexion...', credentials);
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials, { withCredentials: true }).pipe(
      tap(response => console.log('✅ Réponse du serveur:', response)),
      catchError(error => {
        console.error('❌ Erreur de connexion:', error);
        return throwError(() => error);
      })
    );
  }

  /** Déconnexion utilisateur */
  logout(): Observable<any> {
    console.log('🔄 Tentative de déconnexion...');
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).pipe(
      tap(() => console.log('✅ Déconnexion réussie')),
      catchError(error => {
        console.error('❌ Erreur de déconnexion:', error);
        return throwError(() => error);
      })
    );
  }

  /** Écoute les scans de carte RFID */
  getCardScans(): Observable<CardScanData> {
    return new Observable(observer => {
      if (!this.isBrowser) return;

      const handler = (data: CardScanData) => observer.next(data);
      this.socket.on('card-scanned', handler);

      return () => this.socket.off('card-scanned', handler);
    });
  }

  /** Écoute les erreurs de lecture de carte RFID */
  getCardErrors(): Observable<CardError> {
    return new Observable(observer => {
      if (!this.isBrowser) return;

      const handler = (error: CardError) => observer.next(error);
      this.socket.on('card-error', handler);

      return () => this.socket.off('card-error', handler);
    });
  }

  /** Déclenche un scan RFID */
  triggerRfidScan(cardId: string): void {
    if (!this.isBrowser) return;
    if (this.socket && this.socket.connected) {
      this.socket.emit('rfid-scan', cardId);
      console.log(`📡 Scan RFID envoyé pour la carte ${cardId}`);
    } else {
      console.error('❌ Impossible d’envoyer le scan RFID, socket non connectée.');
    }
  }

  /** Déconnecte le WebSocket proprement */
  disconnect(): void {
    if (!this.isBrowser) return;
    if (this.socket) {
      this.socket.disconnect();
      console.log('⚡ WebSocket déconnecté');
    }
  }
}
