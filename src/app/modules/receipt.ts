import { RecieptCategory } from '../enums/reciept-category';

export interface Receipt {
  _id: string;
  userId: string;
  title: string;
  description: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  createdAt: Date;
  updatedAt: Date;
  featured: boolean;
  category: RecieptCategory;
  rating: number;
  cookTime: number;
  difficulty: string;
}
