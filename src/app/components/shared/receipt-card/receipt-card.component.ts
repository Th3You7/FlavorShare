import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Receipt } from '../../../modules/receipt';

@Component({
  selector: 'app-receipt-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
      <img
        [src]="recipe.imageUrl"
        [alt]="recipe.title"
        class="w-full h-48 object-cover"
      />
      <div class="p-4">
        <h3 class="text-xl font-semibold mb-2">{{ recipe.title }}</h3>
        <p class="text-gray-600 mb-4">{{ recipe.description }}</p>

        <div *ngIf="showActions" class="flex justify-end gap-2">
          <button
            (click)="onEdit()"
            class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            (click)="onDelete()"
            class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ReceiptCardComponent {
  @Input() recipe!: Receipt;
  @Input() showActions: boolean = false;
  @Output() editRecipe = new EventEmitter<void>();
  @Output() deleteRecipe = new EventEmitter<void>();

  onEdit() {
    this.editRecipe.emit();
  }

  onDelete() {
    this.deleteRecipe.emit();
  }

  getFullStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getEmptyStars(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }
}
