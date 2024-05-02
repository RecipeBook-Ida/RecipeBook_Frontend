import { Button, TextField } from "@mui/material";
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

  const handleAddIngredient = () => {
    const subRecipes = [...formData.subRecipes];
    subRecipes[index].ingredients.push({
      quantity: 0,
      unit: "",
      ingredientId: 0,
    });

    setFormData({
      ...formData,
      subRecipes: subRecipes,
    });

    console.log(formData);
  };

  const handleDelete = (i: number) => {
    const deleteIngredient = [...formData.subRecipes];
    deleteIngredient[index].ingredients.splice(i, 1);
    setFormData({ ...formData, subRecipes: deleteIngredient });
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
        name="instructions"
        label="Instruksjoner"
        multiline
        fullWidth
        maxRows={4}
        value={formData.subRecipes[index].instructions}
        onChange={handleChange}
        helperText={formErrors.instruction && "Fill"}
      />

      {formData.subRecipes[index].ingredients.map((_singredient, index) => (
        <>
          <IngredientQuantityForm
            index={index}
            formData={formData}
            setFormData={setFormData}
            ingredients={ingredients}
          ></IngredientQuantityForm>

          <Button onClick={() => handleDelete(index)}>Delete</Button>
        </>
      ))}

      <Button variant="contained" color="primary" onClick={handleAddIngredient}>
        + ingrediens
      </Button>
    </div>
  );
};
export default SubRecipeForm;
