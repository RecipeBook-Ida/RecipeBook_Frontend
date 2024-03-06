import { useEffect, useState } from "react";
import { useGetRecipeById } from "../services/recipe/getRecipe";
import { Recipe } from "../types/RecipeType";

import RecipeDetails from "../components/common/Recipe/RecipeDetails";

function RecipePage() {
  const url = window.location.href;
  const n = url.lastIndexOf("/");
  const id = Number(url.substring(n + 1));

  const recipeHook = useGetRecipeById(id);
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    if (!recipeHook.isLoading && recipeHook.data) {
      setRecipe(recipeHook.data as unknown as Recipe);
    }
  }, [recipeHook.data, recipeHook.isLoading, recipeHook.isStale]);

  return <div className="px-6 w-full h-full">{recipe && <RecipeDetails recipe={recipe} />}</div>;
}
export default RecipePage;
