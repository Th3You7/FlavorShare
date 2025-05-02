import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReceiptService } from './services/receipt.service';
import { Receipt } from './modules/receipt';
import { RecieptCategory } from './enums/reciept-category';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'flavor-share';
  receiptService = inject(ReceiptService);
  receipts: Receipt[] = [];

  ngOnInit(): void {
    this.getReciepts();
  }

  getReciepts(): void {
    this.receiptService.getReciepts();
  }

  filterReceipts(category: RecieptCategory): void {
    this.receiptService.filterByCategory(category);
  }

  searchReceipts(str: string): void {
    this.receiptService.searchReciept(str);
  }
}
