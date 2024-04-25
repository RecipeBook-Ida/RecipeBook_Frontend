import { useEffect, useState } from "react";
import { useGetAllRecipes } from "../services/recipe/getRecipe";
import { Recipe } from "../types/RecipeType";
import RecipeCardGroup from "../components/common/Recipe/RecipeCardGroup";
import Breadcrumb from "../components/common/Breadcrumb";

function RecipeListPage() {
  const recipeHook = useGetAllRecipes();
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    if (!recipeHook.isLoading && recipeHook.data) {
      setRecipes([...(recipeHook.data as Recipe[])]);
    }
  }, [recipeHook.data, recipeHook.isLoading, recipeHook.isStale]);

  return (
    <div className="h-full overflow-y-auto pb-28 px-6">
      <Breadcrumb />
      <RecipeCardGroup recipes={recipes} size="large"/>
    </div>
  );
}
export default RecipeListPage;
