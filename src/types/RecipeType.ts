import { IngredientQuantity } from "./Ingredient";

export type Recipe = {
  id: number;
  title: string;
  description: string;
  cooktime: number;
  image: string;
  cuisine: string;
  type: string;
  portion: number;
  subRecipes: SubRecipe[];
};

export type RecipeList = {
  id: number;
  title: string;
  description: string;
  image: string;
};

export type SubRecipe = {
  id: number;
  title: string;
  instructions: string;
  ingredients: IngredientQuantity[];
};