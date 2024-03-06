import { useEffect, useState } from "react";
import { useGetAllRecipes } from "../services/recipe/getRecipe";
import { Recipe } from "../types/RecipeType";
import OpenBook from "./book/OpenBook";
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
    <OpenBook>
      <div className=" flex flex-wrap gap-5 overflow-y-scroll h-full col-span-2">
        <Breadcrumb/>
        <RecipeCardGroup recipes={recipes} />
      </div>
    </OpenBook>
  );
}
export default RecipeListPage;
