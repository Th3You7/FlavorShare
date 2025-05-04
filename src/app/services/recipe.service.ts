import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Receipt } from '../modules/receipt';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private url = 'http://localhost:3000/recipes';
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  getMyRecipes(): Observable<Receipt[]> {
    const userId = this.authService.getUserId();
    return this.http.get<Receipt[]>(`${this.url}?userId=${userId}`);
  }

  createRecipe(recipe: Omit<Receipt, '_id'>): Observable<Receipt> {
    const userId = this.authService.getUserId();
    return this.http.post<Receipt>(this.url, { ...recipe, userId });
  }

  updateRecipe(id: string, recipe: Partial<Receipt>): Observable<Receipt> {
    return this.http.patch<Receipt>(`${this.url}/${id}`, recipe);
  }

  deleteRecipe(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
