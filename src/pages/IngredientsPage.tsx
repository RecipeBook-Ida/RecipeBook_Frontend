import { useEffect, useState } from "react";
import { useGetAllIngredients } from "../services/ingredient/getIngredient";
import { Ingredient } from "../types/Ingredient";
import OpenBook from "./book/OpenBook";

function IngredientsPage() {
  const ingredientHook = useGetAllIngredients();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    if (!ingredientHook.isLoading && ingredientHook.data) {
      setIngredients([...(ingredientHook.data as Ingredient[])]);
    }
  }, [ingredientHook.data, ingredientHook.isLoading, ingredientHook.isStale]);

  console.log(ingredients);
  return (
    <OpenBook>
      <p></p>
    </OpenBook>
  );
}
export default IngredientsPage;
