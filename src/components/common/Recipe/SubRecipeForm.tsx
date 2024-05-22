import { Button } from "@mui/material";
import { useRef, useState } from "react";
import IngredientQuantityForm from "./IngredientQuantityForm";
import { Ingredient, IngredientQuantityPost } from "../../../types/Ingredient";
import { SubRecipePost } from "../../../types/RecipeType";
import ValidatedTextField from "../inputField/ValidatedTextField";
import { requiredValidator } from "../../../utils/textFieldValidators";

interface SubRecipeFormProps {
  ingredients: Ingredient[];
  index: number;
  submitClicked: boolean;
  updateSubRecipeForm: (updateSubRecipe: SubRecipePost, index: number) => void;
}

const SubRecipeForm: React.FC<SubRecipeFormProps> = ({
  ingredients,
  index,
  submitClicked,
  updateSubRecipeForm,
}) => {
  const [formData, setFormData] = useState<SubRecipePost>({
    title: "",
    instructions: "",
    ingredients: [],
  });

  const handleChange = (name: string, value: any) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    updateSubRecipeForm(formData, index);
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
  };

  const handleDelete = (i: number) => {
    const deleteIngredient = [...formData.ingredients];
    deleteIngredient.splice(i, 1);
    setFormData({ ...formData, ingredients: deleteIngredient });
  };

  const updateIngredientsList = (
    updatedIngredient: IngredientQuantityPost,
    index: number
  ) => {
    const ingredients = [...formData.ingredients];
    ingredients[index] = updatedIngredient;

    setFormData((prevState) => ({
      ...prevState,
      ingredients: ingredients,
    }));
  };

  const renderIngredientForm = () => {
    return formData.ingredients.map((_ingredients, index) => (
      <>
        <IngredientQuantityForm
          key={`ingredient_${index}`}
          index={index}
          updateIngredientForm={updateIngredientsList}
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
    ));
  };

  return (
    <div className=" ">
      <ValidatedTextField
        submit={submitClicked}
        label="Titel"
        validator={requiredValidator}
        onChange={(newValue) => handleChange("title", newValue)}
      />
      <ValidatedTextField
        submit={submitClicked}
        label="Instruksjoner"
        validator={requiredValidator}
        onChange={(newValue) => handleChange("instructions", newValue)}
      />

      {renderIngredientForm()}

      <Button variant="contained" color="primary" onClick={handleAddIngredient}>
        + ingrediens
      </Button>
    </div>
  );
};
export default SubRecipeForm;
