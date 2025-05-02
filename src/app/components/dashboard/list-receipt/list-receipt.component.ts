import { Component, inject, OnInit } from '@angular/core';
import { ReceiptService } from '../../../services/receipt.service';

@Component({
  selector: 'app-list-receipt',
  imports: [],
  templateUrl: './list-receipt.component.html',
  styleUrl: './list-receipt.component.css',
})
export class ListReceiptComponent implements OnInit {
  private receiptService = inject(ReceiptService);

  ngOnInit(): void {
    this.getReceipts();
  }

  getReceipts(): void {
    this.receiptService.getReciepts();
  }
}
