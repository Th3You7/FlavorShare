import { Component, inject, Input, OnInit } from '@angular/core';
import { Receipt } from '../../modules/receipt';
import { ReceiptService } from '../../services/receipt.service';

@Component({
  selector: 'app-receipt',
  imports: [],
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.css',
})
export class ReceiptComponent implements OnInit {
  private _receiptId: string = '';
  private receipt: Receipt = {} as Receipt;
  private receiptService = inject(ReceiptService);

  @Input()
  set receiptId(receiptId: string) {
    this._receiptId = receiptId;
  }

  ngOnInit(): void {
    this.getArticle();
  }

  getArticle(): void {
    this.receiptService.getReciept(this._receiptId);
  }
}
