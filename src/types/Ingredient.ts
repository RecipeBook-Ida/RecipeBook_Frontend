export type Ingredient = {
  id: number;
  name: string;
  image: string;
  category: string;
};

export type IngredientQuantity = {
  id: number;
  quantity: number;
  unit: string;
  ingredient: Ingredient;
};
