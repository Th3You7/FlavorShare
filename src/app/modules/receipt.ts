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
}
