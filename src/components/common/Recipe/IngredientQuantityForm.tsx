import { Autocomplete } from "@mui/material";
import { useState } from "react";
import { Ingredient, IngredientQuantityPost } from "../../../types/Ingredient";
import ValidatedTextField from "../inputField/ValidatedTextField";
import {
  posNumberValidator,
  requiredValidator,
} from "../../../utils/textFieldValidators";

interface IngredientQuantityFormProps {
  ingredients: Ingredient[];
  index: number;
  updateIngredientForm: (
    updateIngredints: IngredientQuantityPost,
    index: number
  ) => void;
  submitClicked: boolean;
}

const IngredientQuantityForm: React.FC<IngredientQuantityFormProps> = ({
  index,
  ingredients,
  updateIngredientForm,
  submitClicked,
}) => {
  const unit = ["stk", "ss", "ts", "krm", "dl", "l", "g", "kg", "mg"];

  const [formData, setFormData] = useState<IngredientQuantityPost>({
    quantity: 0,
    unit: "",
    ingredientId: 1,
  });

  const handleChange = (name: string, value: any) => {
    const form = {
      ...formData,
      [name]: value,
    };
    setFormData(form);
    updateIngredientForm(form, index);
  };

  return (
    <div className=" flex">
      <Autocomplete
        id="ingredientId"
        renderInput={() => (
          <ValidatedTextField
            submit={submitClicked}
            label="Ingrediens"
            validator={requiredValidator}
            onChange={(newValue) => handleChange("ingredientId", newValue)}
          />
        )}
        options={ingredients}
      ></Autocomplete>

      <ValidatedTextField
        submit={submitClicked}
        number
        label="Mengde"
        validator={posNumberValidator}
        onChange={(newValue) => handleChange("quantity", newValue)}
      />

      <Autocomplete
        id="unit"
        /*         onInputChange={(newValue, isValid) =>
          handleChange("unit", newValue, isValid)
        } */
        renderInput={() => (
          <ValidatedTextField
            submit={submitClicked}
            label="Enhet"
            validator={requiredValidator}
            onChange={(newValue) => handleChange("unit", newValue)}
          />
        )}
        options={unit}
      ></Autocomplete>
    </div>
  );
};
export default IngredientQuantityForm;
