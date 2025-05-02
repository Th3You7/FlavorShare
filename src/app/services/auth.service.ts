import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { Receipt } from '../modules/receipt';
import { AuthLogin, AuthRegister } from '../modules/auth';
import { ReceiptComponent } from '../components/receipt/receipt.component';
import { User } from '../modules/user';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  private url = 'http://localhost:3000/users';
  private http = inject(HttpClient);
  private router = inject(Router);
  private isAuthenticated: boolean;

  login(auth: AuthLogin): void {
    this.http.get<User[]>(this.url).subscribe((users: User[]) => {
      const user = users.find((user: User) => user.email === auth.email);

      if (user && user.password === auth.password) {
        localStorage.setItem(
          'user',
          JSON.stringify({ email: user.email, name: user.name })
        );
        this.isAuthenticated = true;
        this.router.navigate(['/dashboard']);
      }
    });
  }

  register(auth: AuthRegister): void {
    this.http.get<User[]>(this.url).pipe(
      switchMap((users) => {
        if (users.length > 0) {
          throw new Error('Email already exists');
        }
        return this.http.post<User>(`${this.url}/users`, auth);
      })
    );
  }

  logout(): void {
    localStorage.clear();
  }

  ngOnInit(): void {
    this.isAuthenticated = localStorage.getItem('user') ? true : false;
  }
}
