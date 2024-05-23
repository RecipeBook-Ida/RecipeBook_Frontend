import { useState } from "react";
import {
  Ingredient,
  IngredientQuantityPost,
  IngredientQuantityValidPost,
} from "../../../types/Ingredient";
import ValidatedTextField from "../inputField/ValidatedTextField";
import {
  posNumberValidator,
  requiredValidator,
} from "../../../utils/textFieldValidators";

interface IngredientQuantityFormProps {
  ingredients: Ingredient[];
  index: number;
  updateIngredientForm: (
    index: number,
    updateIngredints: IngredientQuantityPost,
    updateFormValid: IngredientQuantityValidPost
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

  const [formValid, setFormValid] = useState<IngredientQuantityValidPost>({
    quantity: false,
    unit: false,
    ingredientId: false,
  });

  const handleChange = (name: string, value: any, isValid: boolean) => {
    const data = {
      ...formData,
      [name]: value,
    };
    setFormData(data);

    const valid = {
      ...formValid,
      [name]: isValid,
    };
    setFormValid(valid);
    updateIngredientForm(index, data, valid);
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
    <div className=" flex">
      {renderTextField("Ingrediens", "ingredientId", { options: ingredients })}
      {renderTextField("Mengde", "quantity", posNumberValidator)}
      {renderTextField("unit", "unit", { options: unit })}
    </div>
  );
};
export default IngredientQuantityForm;
