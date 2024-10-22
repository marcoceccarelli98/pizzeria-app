import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// Interfaccia per la risposta
interface LoginResponse {
  id: number;
  username: string;
  message: string;
  success: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8080/pizzeria/api';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/pizzeria/login`, {
        username,
        password,
      })
      .pipe(
        tap((response) => {
          if (response.id) {
            // Salva i dati dell'utente
            localStorage.setItem('userId', response.id.toString());
            localStorage.setItem('username', response.username);
          }
        })
      );
  }
}
