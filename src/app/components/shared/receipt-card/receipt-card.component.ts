import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Receipt } from '../../../modules/receipt';

@Component({
  selector: 'app-receipt-card',
  imports: [CommonModule],
  templateUrl: './receipt-card.component.html',
})
export class ReceiptCardComponent {
  @Input() recipe!: Receipt;

  getFullStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getEmptyStars(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }
}
