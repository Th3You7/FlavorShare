import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Receipt } from '../../modules/receipt';

@Component({
  selector: 'app-dashboard-recipe-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-recipe-card.component.html',
})
export class DashboardRecipeCardComponent {
  @Input() recipe!: Receipt;
  @Output() editRecipe = new EventEmitter<void>();
  @Output() deleteRecipe = new EventEmitter<void>();

  onEdit() {
    this.editRecipe.emit();
  }

  onDelete() {
    this.deleteRecipe.emit();
  }
}
