import { Autocomplete, Box, Button } from "@mui/material";
import { User, dummyUser } from "../../../types/UserType";
import { useState } from "react";
import SubRecipeForm from "./SubRecipeForm";
import { usePostRecipe } from "../../../services/recipe/postRecipe";
import {
  RecipePost,
  RecipePostForm,
  SubRecipePost,
} from "../../../types/RecipeType";
import { dummyIngredients } from "../../../types/Ingredient";
import { usePostSubRecipe } from "../../../services/recipe/postSubRecipe";
import ValidatedTextField from "../inputField/ValidatedTextField";
import {
  posNumberValidator,
  requiredValidator,
} from "../../../utils/textFieldValidators";

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

  const handleChange = (name: string, value: any) => {
    setFormData({
      ...formData,
      [name]: value,
    });
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
      console.log(createRecipe);
      await postRecipe.mutateAsync(createRecipe);
    }
  };

  const handleAddSubRecipe = () => {
    const subRecipes = [...formData.subRecipes];
    subRecipes.push({
      title: "",
      instructions: "",
      ingredients: [],
    });

    setFormData({
      ...formData,
      subRecipes: subRecipes,
    });
  };

  const handleDelete = (i: number) => {
    const deleteSubRecipe = [...formData.subRecipes];
    deleteSubRecipe.splice(i, 1);
    setFormData({ ...formData, subRecipes: deleteSubRecipe });
  };

  const updateSubRecipeList = (
    updatedSubRecipe: SubRecipePost,
    index: number
  ) => {
    const subRecipes = [...formData.subRecipes];
    subRecipes[index] = updatedSubRecipe;

    setFormData((prevState) => ({
      ...prevState,
      subRecipes: subRecipes,
    }));
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
        onChange={(newValue) => handleChange(name, newValue)}
      />
    );
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
      {renderTextField("Tittel", "title")}
      {renderTextField("Beskrivelse", "description", {
        multiline: true,
        fullWidth: true,
      })}
      {renderTextField("Tid", "cooktime", { number: true }, posNumberValidator)}
      {renderTextField(
        "Porsjon",
        "portion",
        { number: true },
        posNumberValidator
      )}
      {renderTextField("type", "type", { options: type })}
      {renderTextField("cuisine", "cuisine", { options: cuisine })}

      {formData.subRecipes.map((_subRecipe, index) => (
        <>
          <SubRecipeForm
            key={`subRecipe_${index}`}
            index={index}
            updateSubRecipeForm={updateSubRecipeList}
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
