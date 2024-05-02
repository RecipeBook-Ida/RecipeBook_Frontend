import { Box, Button, MenuItem, TextField } from "@mui/material";
import { User, dummyUser } from "../../../types/UserType";
import { useEffect, useState } from "react";
import SubRecipeForm from "./SubRecipeForm";
import { usePostRecipe } from "../../../services/recipe/postRecipe";
import { RecipePost, RecipePostForm } from "../../../types/RecipeType";
import { useGetAllIngredients } from "../../../services/ingredient/getIngredient";
import { Ingredient } from "../../../types/Ingredient";

interface RecipeFormProps {}

const RecipeForm: React.FC<RecipeFormProps> = ({}) => {
  const ingredientHook = useGetAllIngredients();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    if (!ingredientHook.isLoading && ingredientHook.data) {
      setIngredients([...(ingredientHook.data as Ingredient[])]);
    }
  }, [ingredientHook.data, ingredientHook.isLoading, ingredientHook.isStale]);

  const type = ["Frokost", "Lunsj", "Middag", "Dessert", "Annet"];
  const cuisine = ["Italiensk", "Asiatisk", "Vegansk", "Vegetariansk", "Annet"];

  const user: User = dummyUser;
  const postRecipe = usePostRecipe();
  const [formData, setFormData] = useState<RecipePostForm>({
    title: "",
    description: "",
    cooktime: 0,
    image: "",
    cuisine: "",
    type: "",
    portion: 0,
    subRecipes: [
      {
        title: "",
        instructions: "",
        ingredients: [
          {
            quantity: 0,
            unit: "",
            ingredientId: 0,
          },
        ],
      },
    ],
    appUser: user.id,
  });
  const [formErrors, setFormErrors] = useState({
    title: false,
    description: false,
    cooktime: false,
    image: false,
    cuisine: false,
    type: false,
    portion: false,
    subRecipes: false,
    appUser: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      alert("Oppskrift laget!");
      //const ids = formData.subRecipes.map((subRecipe) => subRecipe.title);
      const createRecipe: RecipePost = {
        title: formData.title,
        description: formData.description,
        cooktime: formData.cooktime,
        image: formData.image,
        cuisine: formData.cuisine,
        type: formData.type,
        portion: formData.portion,
        subRecipeIds: [1, 2],
        appUser: user.id,
      };
      await postRecipe.mutateAsync(createRecipe);
    } else alert("Venligst fyll ut alle felt.");
  };

  const handleAddSubRecipe = () => {
    setFormData({
      ...formData,
      subRecipes: [
        ...formData.subRecipes,
        {
          title: "",
          instructions: "",
          ingredients: [
            {
              quantity: 0,
              unit: "",
              ingredientId: 0,
            },
          ],
        },
      ],
    });
  };

  const handleDelete = (i: number) => {
    const deleteSubRecipe = [...formData.subRecipes];
    deleteSubRecipe.splice(i, 1);
    setFormData({ ...formData, subRecipes: deleteSubRecipe });
  };

  if (ingredientHook.isPending || !ingredients) return "Loading...";

  if (ingredientHook.error)
    return "An error has occurred: " + ingredientHook.error.message;

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        name="title"
        label="Tittel"
        variant="outlined"
        value={formData.title}
        onChange={handleChange}
        error={formErrors.title}
        helperText={formErrors.title && "Fill"}
        required
      />
      <TextField
        required
        name="description"
        label="Beskrivelse"
        multiline
        fullWidth
        maxRows={4}
        value={formData.description}
        onChange={handleChange}
        error={formErrors.description}
      />
      <TextField
        required
        name="cooktime"
        label="Tid"
        type="number"
        variant="outlined"
        value={formData.cooktime}
        onChange={handleChange}
        error={formErrors.cooktime}
      />
      <TextField
        required
        name="type"
        label="Type"
        variant="outlined"
        select
        value={formData.type}
        onChange={handleChange}
        error={formErrors.type}
      >
        {type.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        required
        name="cuisine"
        label="Matrett"
        variant="outlined"
        select
        value={formData.cuisine}
        onChange={handleChange}
        error={formErrors.cuisine}
      >
        {cuisine.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      {formData.subRecipes.map((_subRecipe, index) => (
        <>
          <SubRecipeForm
            index={index}
            formData={formData}
            setFormData={setFormData}
            ingredients={ingredients}
          ></SubRecipeForm>
          <Button onClick={() => handleDelete(index)}>Delete</Button>
        </>
      ))}

      <Button variant="contained" color="primary" onClick={handleAddSubRecipe}>
        + subrecipe
      </Button>

      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>

      <p>{JSON.stringify(formData)}</p>
    </Box>
  );
};
export default RecipeForm;
