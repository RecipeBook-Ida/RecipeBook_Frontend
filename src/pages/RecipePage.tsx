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

  if (recipeHook.isPending || !recipe) return "Loading...";

  if (recipeHook.error)
    return "An error has occurred: " + recipeHook.error.message;

  return (
    <div className="w-full h-full">
      <RecipeDetails recipe={recipe} />
    </div>
  );
}
export default RecipePage;
