import { Box, Button, MenuItem, TextField } from "@mui/material";
import { User, dummyUser } from "../../../types/UserType";
import { useState } from "react";
import SubRecipeForm from "./SubRecipeForm";
import { usePostRecipe } from "../../../services/recipe/postRecipe";
import { RecipePost } from "../../../types/RecipeType";

interface RecipeFormProps {}

const RecipeForm: React.FC<RecipeFormProps> = ({}) => {
  const type = ["Frokost", "Lunsj", "Middag", "Dessert", "Annet"];
  const cuisine = ["Italiensk", "Asiatisk", "Vegansk", "Vegetariansk", "Annet"];

  const user: User = dummyUser;
  const postRecipe = usePostRecipe();
  const [formData, setFormData] = useState<RecipePost>({
    title: "",
    description: "",
    cooktime: 0,
    image: "",
    cuisine: "",
    type: "",
    portion: 0,
    subRecipeIds: [],
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
    subRecipeIds: false,
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
      await postRecipe.mutateAsync(formData);
    } else alert("Venligst fyll ut alle felt.");
  };

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

      <SubRecipeForm></SubRecipeForm>

      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </Box>
  );
};
export default RecipeForm;
