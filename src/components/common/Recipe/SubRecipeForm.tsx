import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import IngredientQuantityForm from "./IngredientQuantityForm";
import { Ingredient } from "../../../types/Ingredient";
import { RecipePostForm, SubRecipePost } from "../../../types/RecipeType";

interface SubRecipeFormProps {
  ingredients: Ingredient[];
  index: number;
  recipeFormData: RecipePostForm;
  setRecipeFormData: React.Dispatch<React.SetStateAction<RecipePostForm>>;
  submitClicked: boolean;
}

const SubRecipeForm: React.FC<SubRecipeFormProps> = ({
  ingredients,
  index,
  recipeFormData,
  setRecipeFormData,
  submitClicked,
}) => {
  useEffect(() => {
    if (submitClicked) {
      const errors: { [key: string]: boolean } = {};
      Object.keys(formErrors).forEach((key) => {
        if (!formData[key]) {
          errors[key] = true;
        }
      });
      setFormErrors(errors);
    }
  }, [submitClicked]);

  const [formData, setFormData] = useState<SubRecipePost>({
    title: "",
    instructions: "",
    ingredients: [],
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: boolean }>({
    title: false,
    instruction: false,
  });

  useEffect(() => {
    const updatedSubRecipe = [...recipeFormData.subRecipes];
    updatedSubRecipe[index] = {
      ...formData,
    };
    setRecipeFormData({
      ...recipeFormData,
      subRecipes: updatedSubRecipe,
    });
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedSubRecipe = [...recipeFormData.subRecipes];
    updatedSubRecipe[index] = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedSubRecipe[index]);

    setRecipeFormData({
      ...recipeFormData,
      subRecipes: updatedSubRecipe,
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

  const handleAddIngredient = () => {
    const ingredients = [...formData.ingredients];
    ingredients.push({
      quantity: 0,
      unit: "",
      ingredientId: 0,
    });

    setFormData({
      ...formData,
      ingredients: ingredients,
    });

    console.log(formData);
  };

  const handleDelete = (i: number) => {
    const deleteIngredient = [...formData.ingredients];
    deleteIngredient.splice(i, 1);
    setFormData({ ...formData, ingredients: deleteIngredient });
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
        helperText={formErrors.title && "Fill"}
      />
      <TextField
        name="instructions"
        label="Instruksjoner"
        multiline
        fullWidth
        maxRows={4}
        value={formData.instructions}
        onChange={handleChange}
        error={formErrors.instruction}
        helperText={formErrors.instruction && "Fill"}
      />

      {formData.ingredients.map((_singredient, index) => (
        <>
          <IngredientQuantityForm
            key={`ingredient_${index}`}
            index={index}
            subRecipeformData={formData}
            setSubRecipeFormData={setFormData}
            ingredients={ingredients}
            submitClicked={submitClicked}
          ></IngredientQuantityForm>

          <Button
            key={`ingredient_deleteButton_${index}`}
            onClick={() => handleDelete(index)}
          >
            Delete
          </Button>
        </>
      ))}

      <Button variant="contained" color="primary" onClick={handleAddIngredient}>
        + ingrediens
      </Button>
    </div>
  );
};
export default SubRecipeForm;
