import { Autocomplete, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Ingredient, IngredientQuantityPost } from "../../../types/Ingredient";
import { SubRecipePost } from "../../../types/RecipeType";

interface IngredientQuantityFormProps {
  ingredients: Ingredient[];
  index: number;
  subRecipeformData: SubRecipePost;
  setSubRecipeFormData: React.Dispatch<React.SetStateAction<SubRecipePost>>;
  submitClicked: boolean;
}

const IngredientQuantityForm: React.FC<IngredientQuantityFormProps> = ({
  index,
  ingredients,
  subRecipeformData,
  setSubRecipeFormData,
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
  const unit = ["stk", "ss", "ts", "krm", "dl", "l", "g", "kg", "mg"];
  const [formData, setFormData] = useState<IngredientQuantityPost>({
    quantity: 0,
    unit: "",
    ingredientId: 1,
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: boolean }>({
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
      <Autocomplete
        getOptionLabel={(option) => option.name}
        id="ingredientId"
        renderInput={(params) => (
          <TextField
            {...params}
            required
            name="ingredientId"
            label="Ingrediens"
            variant="outlined"
            value={formData.ingredientId}
            onChange={handleChange}
            error={formErrors.ingredientId}
            helperText={formErrors.ingredientId && "Fill"}
          />
        )}
        options={ingredients}
      ></Autocomplete>

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

      <Autocomplete
        id="unit"
        renderInput={(params) => (
          <TextField
            {...params}
            required
            name="unit"
            label="Enhet"
            variant="outlined"
            value={formData.unit}
            onChange={handleChange}
            error={formErrors.unit}
            helperText={formErrors.unit && "Fill"}
          />
        )}
        options={unit}
      ></Autocomplete>
    </div>
  );
};
export default IngredientQuantityForm;
