import { CgBowl } from "react-icons/cg";
import { Recipe } from "../types/RecipeType";
import NumberInput from "./common/inputField/NumberInput";
import { useState } from "react";
import { IngredientQuantity } from "../types/Ingredient";

interface IngredientListProps {
  recipe: Recipe;
}

const IngredientList: React.FC<IngredientListProps> = ({ recipe }) => {
  const [portion, setPortion] = useState<number>(recipe.portion);

  const calcAmountOfIngredient = (ingredient: IngredientQuantity) => {
    const forhold = portion / recipe.portion;
    const quantity = Math.round(ingredient.quantity * forhold*100)/100;
    return <p>{quantity + " " + ingredient.unit}</p>;
  };

  return (
    <div className=" space-y-10 flex items-center flex-col">
      <h3>Ingredienser</h3>

      <NumberInput
        defaultValue={recipe.portion}
        text="PORSJONER"
        icon={<CgBowl size={25} />}
        setValue={setPortion}
      />

      {recipe.subRecipes.map((subRecipe) => (
        <ol key={`subRecipe_${subRecipe.id}`}>
          <h4>{subRecipe.title}</h4>
          {subRecipe.ingredients.map((ingredient) => (
            <li
              className=" grid grid-cols-2 border-b-2"
              key={`subRecipe_${subRecipe.id}-ingredient_${ingredient.id}`}
            >
              {/*  <p>{ingredient.quantity}{ + " " + ingredient.unit}</p> */}
              {calcAmountOfIngredient(ingredient)}
              <p>{ingredient.ingredient.name}</p>
            </li>
          ))}
        </ol>
      ))}
    </div>
  );
};
export default IngredientList;
