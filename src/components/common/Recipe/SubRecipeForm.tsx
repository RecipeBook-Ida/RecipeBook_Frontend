import { Button } from "@mui/material";
import { useRef, useState } from "react";
import IngredientQuantityForm from "./IngredientQuantityForm";
import {
  Ingredient,
  IngredientQuantityPost,
  IngredientQuantityValidPost,
} from "../../../types/Ingredient";
import { SubRecipePost, SubRecipeValidPost } from "../../../types/RecipeType";
import ValidatedTextField from "../inputField/ValidatedTextField";
import { requiredValidator } from "../../../utils/textFieldValidators";

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
    ingredients: [],
  });

  const [formValid, setFormValid] = useState<SubRecipeValidPost>({
    title: false,
    instructions: false,
    ingredients: [],
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
      <div key={`ingredientFrom_${index}`}>
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
      </div>
    ));
  };

  const renderTextField = (
    label: string,
    name: string,
    props?: any,
    validator: any = requiredValidator
  ) => {
    return (
      <ValidatedTextField
        {...props}
        submit={submitClicked}
        label={label}
        validator={validator}
        onChange={(newValue, isValid) => handleChange(name, newValue, isValid)}
      />
    );
  };

  return (
    <div className=" ">
      {renderTextField("Tittel", "title")}
      {renderTextField("Instruksjoner", "instructions")}

      {renderIngredientForm()}

      <Button variant="contained" color="primary" onClick={handleAddIngredient}>
        + ingrediens
      </Button>
    </div>
  );
};
export default SubRecipeForm;
