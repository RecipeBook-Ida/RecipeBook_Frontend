import { MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { Ingredient, IngredientQuantityPost } from "../../../types/Ingredient";
import { SubRecipePost } from "../../../types/RecipeType";

interface IngredientQuantityFormProps {
  ingredients: Ingredient[];
  index: number;
  subRecipeformData: SubRecipePost;
  setSubRecipeFormData: React.Dispatch<React.SetStateAction<SubRecipePost>>;
}

const IngredientQuantityForm: React.FC<IngredientQuantityFormProps> = ({
  index,
  ingredients,
  subRecipeformData,
  setSubRecipeFormData,
}) => {
  const unit = ["stk", "ss", "ts", "krm", "dl", "l", "g", "kg", "mg"];
  const [formData, setFormData] = useState<IngredientQuantityPost>({
    quantity: 0,
    unit: "",
    ingredientId: 0,
  });

  const [formErrors, setFormErrors] = useState({
    quantity: false,
    unit: false,
    ingredientId: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedIngredient = [...subRecipeformData.ingredients];
    updatedIngredient[index] = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedIngredient[index]);

    setSubRecipeFormData({
      ...subRecipeformData,
      ingredients: updatedIngredient,
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

    console.log(formData);
    console.log(formErrors);
  };

  return (
    <div className=" ">
      <TextField
        required
        name="ingredientId"
        label="Ingrediens"
        select
        variant="outlined"
        value={formData.ingredientId}
        onChange={handleChange}
        error={formErrors.ingredientId}
        helperText={formErrors.ingredientId && "Fill"}
      >
        {ingredients.map((ingredient) => (
          <MenuItem key={ingredient.id} value={ingredient.id}>
            {ingredient.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        required
        name="quantity"
        label="Mengde"
        type="number"
        variant="outlined"
        value={formData.quantity}
        onChange={handleChange}
        error={formErrors.quantity}
        helperText={formErrors.quantity && "Fill"}
      />
      <TextField
        required
        name="unit"
        label="Enhet"
        variant="outlined"
        select
        value={formData.unit}
        onChange={handleChange}
        error={formErrors.unit}
        helperText={formErrors.unit && "Fill"}
      >
        {unit.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};
export default IngredientQuantityForm;
