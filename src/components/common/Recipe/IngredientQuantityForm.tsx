import { Box, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { IngredientQuantityPost } from "../../../types/Ingredient";

interface IngredientQuantityFormProps {
  setformData: (data: IngredientQuantityPost) => void;
}

const IngredientQuantityForm: React.FC<IngredientQuantityFormProps> = ({
  setformData,
}) => {
  const unit = ["stk", "ss", "ts", "krm", "dl", "l", "g", "kg", "mg"];
  const [ingredientQuantity, setIngredientQuantity] = useState({
    quantity: 0,
    unit: "",
    ingredientId: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIngredientQuantity({
      ...ingredientQuantity,
      [name]: value,
    });
    setformData(ingredientQuantity);
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div className=" ">
        <TextField
          id="quantity"
          label="Mengde"
          type="number"
          variant="outlined"
          value={ingredientQuantity.quantity}
          onChange={handleChange}
        />
        <TextField
          id="unit"
          label="Enhet"
          variant="outlined"
          select
          value={ingredientQuantity.unit}
          onChange={handleChange}
        >
          {unit.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </Box>
  );
};
export default IngredientQuantityForm;
