import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Receipt } from '../modules/receipt';
import { RecieptCategory } from '../enums/reciept-category';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ReceiptService {
  private url = 'http://localhost:3000/receipts';
  private http: HttpClient = inject(HttpClient);
  private authService = inject(AuthService);
  getReciepts() {
    this.http.get<Receipt[]>(this.url);
  }

  getReciept(id: string) {
    this.http.get<Receipt>(`${this.url}/${id}`);
  }

  getMyRecipes(): Observable<Receipt[]> {
    const userId = this.authService.getUserId();
    return this.http.get<Receipt[]>(`${this.url}?userId=${userId}`);
  }

  createRecipe(recipe: Omit<Receipt, 'id'>): Observable<Receipt> {
    const userId = this.authService.getUserId();
    return this.http.post<Receipt>(this.url, { ...recipe, userId });
  }

  searchReciept(str: string) {
    this.http.get<Receipt[]>(`${this.url}/`); // to terminate later
  }

  filterByCategory(category: RecieptCategory) {
    this.http.get<Receipt[]>(this.url); //to terminate later
  }

  deleteRecipe(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  updateRecipe(id: string, recipe: Partial<Receipt>): Observable<Receipt> {
    return this.http.patch<Receipt>(`${this.url}/${id}`, recipe);
  }
}
