import { IngredientQuantity, IngredientQuantityPost } from "./Ingredient";
import { UserList } from "./UserType";

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
  appUser: UserList;
};

export type RecipeList = {
  id: number;
  title: string;
  description: string;
  cooktime: number;
  image: string;
  cuisine: string;
  type: string;
  portion: number;
};

export type RecipePost = {
  title: string;
  description: string;
  cooktime: number;
  image: string;
  cuisine: string;
  type: string;
  portion: number;
  subRecipeIds: number[];
  appUser: number;
};

export type SubRecipe = {
  id: number;
  title: string;
  instructions: string;
  ingredients: IngredientQuantity[];
};

export type SubRecipePost = {
  title: string;
  instructions: string;
  ingredients: IngredientQuantityPost[];
};
