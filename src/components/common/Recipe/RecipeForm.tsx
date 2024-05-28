import { Box, Button } from "@mui/material";
import { User, dummyUser } from "../../../types/UserType";
import { useState } from "react";
import SubRecipeForm from "./SubRecipeForm";
import { usePostRecipe } from "../../../services/recipe/postRecipe";
import {
  RecipePost,
  RecipePostForm,
  RecipeValidPost,
  SubRecipePost,
} from "../../../types/RecipeType";
import { dummyIngredients } from "../../../types/Ingredient";
import { usePostSubRecipe } from "../../../services/recipe/postSubRecipe";
import ValidatedTextField from "../inputField/ValidatedTextField";
import { posNumberValidator } from "../../../utils/textFieldValidators";

interface RecipeFormProps {
  onSave?: () => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ onSave }) => {
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
    description: true,
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
      onSave?.();
      alert("Oppskrift laget!");
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
    validator?: any
  ) => {
    return (
      <ValidatedTextField
        key={label}
        required
        submit={submitClicked}
        label={label}
        validator={validator}
        onChange={(newValue, isValid) => handleChange(name, newValue, isValid)}
        {...props}
      />
    );
  };

  const renderSubRecipeForm = () => {
    return formData.subRecipes.map((subRecipe, index) => (
      <div key={`subRecipeFrom_${index}`}>
        <div className="flex">
          <h4>Deloppskrift {subRecipe.title || index + 1}</h4>
          {index > 0 && (
            <Button
              key={`subRecipe_deleteButton_${index}`}
              onClick={() => handleDelete(index)}
            >
              Fjern
            </Button>
          )}
        </div>
        <SubRecipeForm
          key={`subRecipe_${index}`}
          index={index}
          updateSubRecipeForm={updateSubRecipeList}
          ingredients={ingredients}
          submitClicked={submitClicked}
        ></SubRecipeForm>
      </div>
    ));
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
      className=" max-w-full gap-6 flex flex-col break-all"
    >
      <h2>Lag ny oppskrift</h2>
      <div className=" flex gap-6">
        {renderTextField("Tittel", "title")}
        {renderTextField("Beskrivelse", "description", {
          multiline: true,
          maxRows: 4,
          fullWidth: true,
          required: false,
        })}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="flex gap-6">
          {renderTextField(
            "Tilberedelsestid",
            "cooktime",
            { number: true },
            posNumberValidator
          )}
          {renderTextField(
            "Antall porsjoner",
            "portion",
            { number: true },
            posNumberValidator
          )}
        </div>

        {renderTextField("Type måltid", "type", { options: type })}
        {renderTextField("Rett", "cuisine", { options: cuisine })}
      </div>

      <h4>Legg til del-opskrifter</h4>
      {renderSubRecipeForm()}
      <Button variant="contained" color="primary" onClick={handleAddSubRecipe}>
        + deloppskrift
      </Button>

      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </Box>
  );
};
export default RecipeForm;
