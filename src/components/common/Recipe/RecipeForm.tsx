import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { User, dummyUser } from "../../../types/UserType";
import { useState } from "react";
import SubRecipeForm from "./SubRecipeForm";
import { usePostRecipe } from "../../../services/recipe/postRecipe";
import { RecipePost, RecipePostForm } from "../../../types/RecipeType";
import { dummyIngredients } from "../../../types/Ingredient";
import { usePostSubRecipe } from "../../../services/recipe/postSubRecipe";

interface RecipeFormProps {}

const RecipeForm: React.FC<RecipeFormProps> = ({}) => {
  const [submitClicked, setSubmitClicked] = useState(false);
  const postSubRecipe = usePostSubRecipe();
  const ingredients = dummyIngredients;

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
    subRecipes: [],
    appUser: user.id,
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: boolean }>({
    title: false,
    description: false,
    cooktime: false,
    image: false,
    cuisine: false,
    type: false,
    portion: false,
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
    setSubmitClicked(true);
    if (e.target.checkValidity()) {
      alert("Oppskrift laget!");

      const subRecipePromises = formData.subRecipes.map(async (subRecipe) => {
        const result = await postSubRecipe.mutateAsync(subRecipe);
        return result.id;
      });

      const subRecipeIds = await Promise.all(subRecipePromises);

      const createRecipe: RecipePost = {
        title: formData.title,
        description: formData.description,
        cooktime: formData.cooktime,
        image: formData.image,
        cuisine: formData.cuisine,
        type: formData.type,
        portion: formData.portion,
        subRecipeIds: subRecipeIds,
        appUser: user.id,
      };
      await postRecipe.mutateAsync(createRecipe);
    } else {
      const errors: { [key: string]: boolean } = {};
      Object.keys(formErrors).forEach((key) => {
        if (!formData[key]) {
          errors[key] = true;
        }
      });

      setFormErrors(errors);

      //alert("Venligst fyll ut alle felt.");
    }
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

  const requiredHelperText = "Felt er nødvendig, full ut";

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
        helperText={formErrors.title && requiredHelperText}
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
        helperText={formErrors.description && requiredHelperText}
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
        helperText={formErrors.cooktime && requiredHelperText}
      />
      <TextField
        required
        name="portion"
        label="Porsjon"
        type="number"
        variant="outlined"
        value={formData.portion}
        onChange={handleChange}
        error={formErrors.portion}
        helperText={formErrors.portion && requiredHelperText}
      />
      <Autocomplete
        id="type"
        renderInput={(params) => (
          <TextField
            {...params}
            required
            name="type"
            label="Type"
            value={formData.type}
            onChange={handleChange}
            error={formErrors.type}
            helperText={formErrors.type && requiredHelperText}
          />
        )}
        options={type}
      ></Autocomplete>

      <Autocomplete
        id="cuisine"
        renderInput={(params) => (
          <TextField
            {...params}
            required
            name="cuisine"
            label="Matrett"
            variant="outlined"
            value={formData.cuisine}
            onChange={handleChange}
            error={formErrors.cuisine}
            helperText={formErrors.cuisine && requiredHelperText}
          />
        )}
        options={cuisine}
      ></Autocomplete>

      {formData.subRecipes.map((_subRecipe, index) => (
        <>
          <SubRecipeForm
            key={`subRecipe_${index}`}
            index={index}
            recipeFormData={formData}
            setRecipeFormData={setFormData}
            ingredients={ingredients}
            submitClicked={submitClicked}
          ></SubRecipeForm>
          <Button
            key={`subRecipe_deleteButton_${index}`}
            onClick={() => handleDelete(index)}
          >
            Delete
          </Button>
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
