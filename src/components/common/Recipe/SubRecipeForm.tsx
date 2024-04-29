import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { usePostSubRecipe } from "../../../services/recipe/postSubRecipe";
import IngredientQuantityForm from "./IngredientQuantityForm";
import { SubRecipePost } from "../../../types/RecipeType";

interface SubRecipeFormProps {}

const SubRecipeForm: React.FC<SubRecipeFormProps> = ({}) => {
  const postSubRecipe = usePostSubRecipe();

  const [subRecipe, setNewSubRecipe] = useState<SubRecipePost>({
    title: "",
    instructions: "",
    ingredients: [
      {
        quantity: 0,
        unit: "",
        ingredientId: 0,
      },
    ],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSubRecipe({
      ...subRecipe,
      [name]: value,
    });
  };

  const handleCreateRecipeClick = async () => {
    await postSubRecipe.mutateAsync(subRecipe);
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
          id="subTitle"
          label="Tittel"
          variant="outlined"
          value={subRecipe.title}
          onChange={handleChange}
        />
        <TextField
          id="instructions"
          label="Instruksjoner"
          multiline
          fullWidth
          maxRows={4}
          value={subRecipe.instructions}
          onChange={handleChange}
        />

        <IngredientQuantityForm setformData={subRecipe.ingredients}></IngredientQuantityForm>
      </div>
    </Box>
  );
};
export default SubRecipeForm;
