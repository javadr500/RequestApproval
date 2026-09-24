import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest
} from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = 'http://localhost:5027/api/auth';

  private readonly tokenSignal =
    signal<string | null>(localStorage.getItem('token'));

  readonly token = this.tokenSignal.asReadonly();

  constructor(private http: HttpClient) {}

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, request)
      .pipe(
        tap(response => {
          this.setToken(response.token);
        })
      );
  }

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/register`, request)
      .pipe(
        tap(response => {
          this.setToken(response.token);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.tokenSignal.set(null);
  }

  isAuthenticated(): boolean {
    return !!this.tokenSignal();
  }

  private setToken(token: string): void {
    localStorage.setItem('token', token);
    this.tokenSignal.set(token);
  }

  getToken(): string | null {
    return this.tokenSignal();
  }
}

