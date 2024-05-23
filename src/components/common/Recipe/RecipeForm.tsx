import { Autocomplete, Box, Button } from "@mui/material";
import { User, dummyUser } from "../../../types/UserType";
import { useState } from "react";
import SubRecipeForm from "./SubRecipeForm";
import { usePostRecipe } from "../../../services/recipe/postRecipe";
import {
  RecipePost,
  RecipePostForm,
  RecipeValidPost,
  SubRecipePost,
  SubRecipeValidPost,
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
    subRecipes: [{ title: "", instructions: "", ingredients: [] }],
    appUser: user.id,
  });

  const [formValid, setFormValid] = useState<RecipeValidPost>({
    title: false,
    description: false,
    cooktime: false,
    image: true,
    cuisine: false,
    type: false,
    portion: false,
    subRecipes: [false],
    appUser: true,
  });

  const handleChange = (name: string, value: any, isValid: boolean) => {
    setFormData({
      ...formData,
      [name]: value,
    });

    setFormValid({
      ...formValid,
      [name]: isValid,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitClicked(true);
    const valid = Object.values(formValid)
      .flatMap((value) => (Array.isArray(value) ? value : [value]))
      .every((value) => value === true);
    if (valid) {
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
      alert("Oppskrift laget!");
    } else alert("req!");
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
    index: number,
    updatedSubRecipe: SubRecipePost,
    updatedFormValid: boolean
  ) => {
    const subRecipes = [...formData.subRecipes];
    subRecipes[index] = updatedSubRecipe;

    setFormData((prevState) => ({
      ...prevState,
      subRecipes: subRecipes,
    }));

    const subRecipeValids = [...formValid.subRecipes];
    subRecipeValids[index] = updatedFormValid;

    setFormValid((prevState) => ({
      ...prevState,
      subRecipes: subRecipeValids,
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
        key={label}
        {...props}
        submit={submitClicked}
        label={label}
        validator={validator}
        onChange={(newValue, isValid) => handleChange(name, newValue, isValid)}
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
        <div key={`subRecipeFrom_${index}`}>
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
        </div>
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
