import { TextField } from "@mui/material";
import { useState } from "react";
import IngredientQuantityForm from "./IngredientQuantityForm";
import { Ingredient } from "../../../types/Ingredient";
import { RecipePostForm } from "../../../types/RecipeType";

interface SubRecipeFormProps {
  ingredients: Ingredient[];
  index: number;
  formData: RecipePostForm;
  setFormData: React.Dispatch<React.SetStateAction<RecipePostForm>>;
}

const SubRecipeForm: React.FC<SubRecipeFormProps> = ({
  ingredients,
  index,
  formData,
  setFormData,
}) => {
  /*   const [formData, setFormData] = useState<SubRecipePost>({
    title: "",
    instructions: "",
    ingredients: [
      {
        quantity: 0,
        unit: "",
        ingredientId: 0,
      },
    ],
  }); */

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
    const subRecipe = [...formData.subRecipes];
    subRecipe[index] = {
      ...subRecipe[index],
      [name]: value,
    };
    setFormData({
      ...formData,
      subRecipes: subRecipe,
    });

    if (e.target.validity.valid) {
      setFormErrors({
        ...formErrors,
        [name]: false,
      });
    } else {
      setFormErrors({
        ...formErrors,
        [name]: true,
      });
    }
  };

  return (
    <div className=" ">
      <TextField
        required
        name="title"
        label="Title"
        variant="outlined"
        value={formData.subRecipes[index].title}
        onChange={handleChange}
        error={formErrors.title}
        helperText={formErrors.title && "Fill"}
      />
      <TextField
        id="instructions"
        label="Instruksjoner"
        multiline
        fullWidth
        maxRows={4}
        value={formData.subRecipes[index].instructions}
        onChange={handleChange}
        helperText={formErrors.instruction && "Fill"}
      />

      <IngredientQuantityForm
        ingredients={ingredients}
        //setIngredient={setFormData}
      ></IngredientQuantityForm>
    </div>
  );
};
export default SubRecipeForm;
