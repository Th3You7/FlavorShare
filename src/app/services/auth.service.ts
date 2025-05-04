import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { Receipt } from '../modules/receipt';
import {
  AuthLogin,
  AuthRegister,
  AuthResponse,
  RegisterRequest,
} from '../modules/auth';
import { ReceiptComponent } from '../components/receipt/receipt.component';
import { User } from '../modules/user';
import { Router } from '@angular/router';
import { catchError, map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  private url = 'http://localhost:3000/users';
  private http = inject(HttpClient);
  private router = inject(Router);
  private isAuthenticated: boolean = false;

  login(auth: AuthLogin): Observable<AuthResponse> {
    return this.http.get<User[]>(this.url).pipe(
      map((users: User[]) => {
        const user = users.find((user: User) => user.email === auth.email);
        if (user && user.password === auth.password) {
          const response: AuthResponse = {
            userId: user.id,
            name: user.name,
            email: user.email,
          };
          localStorage.setItem('user', JSON.stringify(response));
          this.isAuthenticated = true;
          this.router.navigate(['/dashboard']);

          return response;
        }
        throw new Error('Invalid email or password');
      }),
      catchError((error) => {
        throw new Error('Invalid email or password');
      })
    );
  }

  register(user: RegisterRequest): Observable<AuthResponse> {
    return this.http.get<User[]>(`${this.url}/users?email=${user.email}`).pipe(
      switchMap((users) => {
        if (users.length > 0) {
          throw new Error('Email already exists');
        }
        return this.http.post<User>(`${this.url}/users`, user);
      }),
      map((user) => ({
        userId: user.id,
        email: user.email,
        name: user.name,
      })),
      catchError((error) => {
        throw new Error('Email already exists');
      })
    );
  }

  logout(): void {
    localStorage.clear();
  }

  ngOnInit(): void {
    this.isAuthenticated = localStorage.getItem('user') ? true : false;
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  getUserId(): string {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.userId;
  }
}
