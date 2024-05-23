import {
  IngredientQuantity,
  IngredientQuantityPost,
  IngredientQuantityValidPost,
} from "./Ingredient";
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
export type RecipePostForm = {
  [key: string]: string | number | SubRecipePost[];
  title: string;
  description: string;
  cooktime: number;
  image: string;
  cuisine: string;
  type: string;
  portion: number;
  subRecipes: SubRecipePost[];
  appUser: number;
};

export type RecipeValidPost = {
  [key: string]: boolean | boolean[];
  title: boolean;
  description: boolean;
  cooktime: boolean;
  image: boolean;
  cuisine: boolean;
  type: boolean;
  portion: boolean;
  subRecipes: boolean[];
  appUser: boolean;
};

export type RecipePost = {
  title: string;
  description: string;
  cooktime: number;
  image: string;
  cuisine: string;
  type: string;
  portion: number;
  subRecipeIds?: number[];
  appUser: number;
};

export type SubRecipe = {
  id: number;
  title: string;
  instructions: string;
  ingredients: IngredientQuantity[];
};

export type SubRecipePost = {
  [key: string]: string | number | IngredientQuantityPost[];
  title: string;
  instructions: string;
  ingredients: IngredientQuantityPost[];
};

export type SubRecipeValidPost = {
  [key: string]: boolean | boolean[];
  title: boolean;
  instructions: boolean;
  ingredients: boolean[];
};
