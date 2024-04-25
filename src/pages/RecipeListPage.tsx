import { useEffect, useState } from "react";
import { useGetAllRecipes } from "../services/recipe/getRecipe";
import { Recipe } from "../types/RecipeType";
import RecipeCardGroup from "../components/common/Recipe/RecipeCardGroup";
import Breadcrumb from "../components/common/Breadcrumb";
import RecipeForm from "../components/common/Recipe/RecipeForm";

function RecipeListPage() {
  const recipeHook = useGetAllRecipes();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [add, setAdd] = useState<boolean>(false);

  useEffect(() => {
    if (!recipeHook.isLoading && recipeHook.data) {
      setRecipes([...(recipeHook.data as Recipe[])]);
    }
  }, [recipeHook.data, recipeHook.isLoading, recipeHook.isStale]);

  return (
    <div className="h-full overflow-y-auto pb-28 px-6">
      <Breadcrumb />
      <RecipeCardGroup recipes={recipes} size="large" />

      <button onClick={() => setAdd(!add)}>ny oppskrift</button>

      {add && <RecipeForm></RecipeForm>}
    </div>
  );
}
export default RecipeListPage;
