import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PumpService {
    private apiUrl = 'http://localhost:5000/api/control-pump';

    constructor(private http: HttpClient) {}

    controlPump(action: 'on' | 'off') {
        return this.http.post(this.apiUrl, { action });
    }
}