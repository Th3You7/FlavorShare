import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Receipt } from '../modules/receipt';
import { RecieptCategory } from '../enums/reciept-category';

@Injectable({
  providedIn: 'root',
})
export class ReceiptService {
  private url = 'http://localhost:3000/receipts';
  private http: HttpClient = inject(HttpClient);

  getReciepts() {
    this.http.get<Receipt[]>(this.url);
  }

  getReciept(id: string) {
    this.http.get<Receipt>(`${this.url}/${id}`);
  }

  createReciept(receipt: Receipt) {
    this.http.post(this.url, receipt);
  }

  searchReciept(str: string) {
    this.http.get<Receipt[]>(`${this.url}/`); // to terminate later
  }

  filterByCategory(category: RecieptCategory) {
    this.http.get<Receipt[]>(this.url); //to terminate later
  }

  removeReceipt(id: string) {
    this.http.delete(`${this.url}/${id}`);
  }
}
