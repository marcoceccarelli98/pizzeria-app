import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Pizza, Impasto, Ingrediente } from './types';

@Injectable({
  providedIn: 'root',
})
export class PizzaService {
  private apiUrl = 'http://127.0.0.1:8080/pizzeria/api';

  constructor(private http: HttpClient) {}

  getPizze(): Observable<Pizza[]> {
    return this.http
      .get<Pizza[]>(`${this.apiUrl}/pizze`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getImpasti(): Observable<Impasto[]> {
    return this.http
      .get<Impasto[]>(`${this.apiUrl}/impasti`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getIngredienti(): Observable<Ingrediente[]> {
    return this.http
      .get<Ingrediente[]>(`${this.apiUrl}/ingredienti`)
      .pipe(retry(2), catchError(this.handleError));
  }

  createPizza(pizza: Pizza): Observable<Pizza> {
    return this.http
      .post<Pizza>(`${this.apiUrl}/pizze`, pizza)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Si è verificato un errore:', error);
    return throwError(
      () => new Error('Qualcosa è andato storto; riprova più tardi.')
    );
  }
}
