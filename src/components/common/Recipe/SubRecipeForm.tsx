import { TextField } from "@mui/material";
import { useState } from "react";
import { usePostSubRecipe } from "../../../services/recipe/postSubRecipe";
import IngredientQuantityForm from "./IngredientQuantityForm";
import { SubRecipePost } from "../../../types/RecipeType";
import { Ingredient } from "../../../types/Ingredient";

interface SubRecipeFormProps {
  ingredients: Ingredient[];
  /*   formData: any;
  setFormData:  (formData: any[]) => void; */
}

const SubRecipeForm: React.FC<SubRecipeFormProps> = ({ ingredients }) => {
  const postSubRecipe = usePostSubRecipe();

  const [formData, setFormData] = useState<SubRecipePost>({
    title: "",
    instructions: "",
    ingredients: [
      {
        quantity: 0,
        unit: "",
        ingredientId: 0,
      },
    ],
  });

  const [formErrors, setFormErrors] = useState({
    title: false,
    instruction: false,
    ingredients: [
      {
        quantity: false,
        unit: false,
        ingredientId: false,
      },
    ],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreateRecipeClick = async () => {
    await postSubRecipe.mutateAsync(formData);
  };

  return (
    <div className=" ">
      <TextField
        required
        name="title"
        label="Title"
        variant="outlined"
        value={formData.title}
        onChange={handleChange}
        error={formErrors.title}
      />
      <TextField
        id="instructions"
        label="Instruksjoner"
        multiline
        fullWidth
        maxRows={4}
        value={formData.instructions}
        onChange={handleChange}
      />

      <IngredientQuantityForm
        ingredients={ingredients}
        //setIngredient={setFormData}
      ></IngredientQuantityForm>
    </div>
  );
};
export default SubRecipeForm;
