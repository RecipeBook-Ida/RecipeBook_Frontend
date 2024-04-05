import { IngredientQuantity } from "./Ingredient";
import { Recipe } from "./RecipeType";

export type User = {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  groceryList: IngredientQuantity[];
  recipes: Recipe[];
};
