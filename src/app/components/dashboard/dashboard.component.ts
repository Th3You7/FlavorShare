import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Receipt } from '../../modules/receipt';
import { RecipeService } from '../../services/recipe.service';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { RecieptCategory } from '../../enums/reciept-category';
import { DashboardRecipeCardComponent } from './dashboard-recipe-card/dashboard-recipe-card.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    DashboardRecipeCardComponent,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  recipes: Receipt[] = [];
  showCreateForm = false;
  editingRecipe: Receipt | null = null;
  categories = Object.values(RecieptCategory);
  difficulties = ['Easy', 'Medium', 'Hard'];

  formData: Partial<Receipt> = {
    title: '',
    description: '',
    image: '',
    ingredients: [''],
    instructions: [''],
    category: RecieptCategory.MAIN_COURSE,
    cookTime: 30,
    difficulty: 'Medium',
    featured: false,
    rating: 0,
  };

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.loadRecipes();
  }

  get featuredRecipesCount(): number {
    return this.recipes.filter((recipe) => recipe.featured).length;
  }

  get uniqueCategoriesCount(): number {
    return new Set(this.recipes.map((recipe) => recipe.category)).size;
  }

  loadRecipes() {
    this.recipeService.getMyRecipes().subscribe({
      next: (recipes) => {
        this.recipes = recipes;
      },
      error: (error) => {
        console.error('Error loading recipes:', error);
      },
    });
  }

  handleSubmit() {
    if (this.editingRecipe) {
      this.recipeService
        .updateRecipe(this.editingRecipe._id, this.formData)
        .subscribe({
          next: () => {
            this.loadRecipes();
            this.cancelForm();
          },
          error: (error) => {
            console.error('Error updating recipe:', error);
          },
        });
    } else {
      this.recipeService
        .createRecipe(this.formData as Omit<Receipt, '_id'>)
        .subscribe({
          next: () => {
            this.loadRecipes();
            this.cancelForm();
          },
          error: (error) => {
            console.error('Error creating recipe:', error);
          },
        });
    }
  }

  startEdit(recipe: Receipt) {
    this.editingRecipe = recipe;
    this.formData = { ...recipe };
    this.showCreateForm = false;
  }

  deleteRecipe(id: string) {
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.recipeService.deleteRecipe(id).subscribe({
        next: () => {
          this.loadRecipes();
        },
        error: (error) => {
          console.error('Error deleting recipe:', error);
        },
      });
    }
  }

  cancelForm() {
    this.showCreateForm = false;
    this.editingRecipe = null;
    this.formData = {
      title: '',
      description: '',
      image: '',
      ingredients: [''],
      instructions: [''],
      category: RecieptCategory.MAIN_COURSE,
      cookTime: 30,
      difficulty: 'Medium',
      featured: false,
      rating: 0,
    };
  }

  addIngredient() {
    this.formData.ingredients?.push('');
  }

  removeIngredient(index: number) {
    this.formData.ingredients?.splice(index, 1);
  }

  addInstruction() {
    this.formData.instructions?.push('');
  }

  removeInstruction(index: number) {
    this.formData.instructions?.splice(index, 1);
  }
}
