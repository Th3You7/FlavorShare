import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { Receipt } from '../../modules/receipt';
import { CommonModule } from '@angular/common';
import { ReceiptCardComponent } from '../shared/receipt-card/receipt-card.component';
import { RecieptCategory } from '../../enums/reciept-category';
import { FormsModule } from '@angular/forms';

type Category = RecieptCategory | 'All';

@Component({
  selector: 'app-home',
  imports: [
    NavbarComponent,
    FooterComponent,
    CommonModule,
    ReceiptCardComponent,
    FormsModule,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  @Input() recipes: Receipt[] = [];
  featuredRecipes: Receipt[] = [];
  currentIndex = 0;
  private intervalId: any;
  @Input() activeCategory: Category = 'All';
  @Output() categoryChange = new EventEmitter<Category>();

  categories: Category[] = ['All', ...Object.values(RecieptCategory)];

  searchQuery: string = '';

  @Output() search = new EventEmitter<string>();

  ngOnInit() {
    console.log(this.categories);
    this.featuredRecipes = this.recipes.filter((recipe) => recipe.featured);
    this.intervalId = setInterval(() => this.nextSlide(), 5000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.featuredRecipes.length;
  }

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.featuredRecipes.length) %
      this.featuredRecipes.length;
  }

  setCurrentIndex(index: number) {
    this.currentIndex = index;
  }

  getFullStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getEmptyStars(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }

  selectCategory(category: Category) {
    this.categoryChange.emit(category);
  }

  handleSearch(event: Event): void {
    event.preventDefault();
    this.search.emit(this.searchQuery);
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.search.emit('');
  }
}
