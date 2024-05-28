import { Button } from "@mui/material";
import { useState } from "react";
import IngredientQuantityForm from "./IngredientQuantityForm";
import { Ingredient, IngredientQuantityPost } from "../../../types/Ingredient";
import { SubRecipePost, SubRecipeValidPost } from "../../../types/RecipeType";
import ValidatedTextField from "../inputField/ValidatedTextField";

interface SubRecipeFormProps {
  ingredients: Ingredient[];
  index: number;
  submitClicked: boolean;
  updateSubRecipeForm: (
    index: number,
    updateSubRecipe: SubRecipePost,
    updateFormValid: boolean
  ) => void;
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
    ingredients: [
      {
        quantity: 0,
        unit: "",
        ingredientId: 1,
      },
    ],
  });

  const [formValid, setFormValid] = useState<SubRecipeValidPost>({
    title: true,
    instructions: false,
    ingredients: [false],
  });

  const handleChange = (name: string, value: any, isValid: boolean) => {
    const updatedFormData = {
      ...formData,
      [name]: value,
    };
    const updatedFormValid = {
      ...formValid,
      [name]: isValid,
    };
    setFormData(updatedFormData);
    setFormValid(updatedFormValid);
    const valid = Object.values(updatedFormValid)
      .flatMap((value) => (Array.isArray(value) ? value : [value]))
      .every((value) => value === true);
    updateSubRecipeForm(index, updatedFormData, valid);
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
    index: number,
    updatedIngredient: IngredientQuantityPost,
    updatedFormValid: boolean
  ) => {
    const ingredients = [...formData.ingredients];
    ingredients[index] = updatedIngredient;

    setFormData((prevState) => ({
      ...prevState,
      ingredients: ingredients,
    }));

    const ingredientsValid = [...formValid.ingredients];
    ingredientsValid[index] = updatedFormValid;

    setFormValid((prevState) => ({
      ...prevState,
      ingredients: ingredientsValid,
    }));
  };

  const renderIngredientForm = () => {
    return formData.ingredients.map((_ingredients, index) => (
      <div className="flex gap-6 pb-6" key={`ingredientFrom_${index}`}>
        <IngredientQuantityForm
          key={`ingredient_${index}`}
          index={index}
          updateIngredientForm={updateIngredientsList}
          ingredients={ingredients}
          submitClicked={submitClicked}
        ></IngredientQuantityForm>

        {index > 0 && (
          <Button
            key={`ingredient_deleteButton_${index}`}
            onClick={() => handleDelete(index)}
          >
            Fjern
          </Button>
        )}
      </div>
    ));
  };

  const renderTextField = (
    label: string,
    name: string,
    props?: any,
    validator?: any
  ) => {
    return (
      <ValidatedTextField
        required
        submit={submitClicked}
        label={label}
        validator={validator}
        onChange={(newValue, isValid) => handleChange(name, newValue, isValid)}
        {...props}
      />
    );
  };

  return (
    <div>
      <div className=" flex gap-6">
        {renderTextField("Deltittel", "title", { required: false })}
        {renderTextField("Instruksjoner", "instructions", {
          multiline: true,
          fullWidth: true,
          maxRows: 6,
          helperText: "Begynn på ny linje for nytt steg",
        })}
      </div>
      <div className="flex justify-center gap-6">
        <h4>Legg til tilhørende ingredienser</h4>
        <Button
          className=""
          variant="contained"
          color="primary"
          onClick={handleAddIngredient}
        >
          + ingrediens
        </Button>
      </div>
      {renderIngredientForm()}
    </div>
  );
};
export default SubRecipeForm;
