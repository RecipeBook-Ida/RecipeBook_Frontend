import { useEffect, useState } from "react";
import { useGetAllRecipes } from "../services/recipe/getRecipe";
import { Recipe } from "../types/RecipeType";
import RecipeCardGroup from "../components/common/Recipe/RecipeCardGroup";
import Breadcrumb from "../components/common/Breadcrumb";
import RecipeForm from "../components/common/Recipe/RecipeForm";
import { Box } from "@mui/material";
import Modal from "../components/common/modal/Modal";
import ModalContent from "../components/common/modal/ModalContent";

function RecipeListPage() {
  const recipeHook = useGetAllRecipes();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!recipeHook.isLoading && recipeHook.data) {
      setRecipes([...(recipeHook.data as Recipe[])]);
    }
  }, [recipeHook.data, recipeHook.isLoading, recipeHook.isStale]);

  return (
    <div className="h-full overflow-y-auto pb-28 px-6">
      <Breadcrumb />
      <RecipeCardGroup recipes={recipes} size="large" />

      <button onClick={() => setModalOpen(!modalOpen)}>ny oppskrift</button>

      <Modal
        isOpen={modalOpen}
        closeModal={() => setModalOpen(!modalOpen)}
        modalContent={"RecipeAdd"}
      ></Modal>
    </div>
  );
}
export default RecipeListPage;
