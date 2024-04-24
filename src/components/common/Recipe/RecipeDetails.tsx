import { Recipe } from "../../../types/RecipeType";
import IngredientList from "../../IngredientList";
import Breadcrumb from "../Breadcrumb";
import InstructionList from "../InstructionList";
import { PiCookingPot } from "react-icons/pi";
import { GiKnifeFork } from "react-icons/gi";
import { MdDinnerDining } from "react-icons/md";
import {
  useUpdateFavorites,
  useUpdateGroceryList,
} from "../../../services/user/putUser";
import { MdLocalGroceryStore } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { useState } from "react";
import { User, dummyUser } from "../../../types/UserType";
import BasicTooltip from "../BasicTooltip";

interface RecipeDetailsProps {
  recipe: Recipe;
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipe }) => {
  const user: User = dummyUser;
  const updateGroceryList = useUpdateGroceryList(user.id);
  const updateFavorites = useUpdateFavorites(user.id);
  const [infavorites, setInFavorites] = useState(
    !!user.favorites.find((f) => f == recipe)
  );

  const handleAddToGroceryListClick = async () => {
    const groceries = recipe.subRecipes
      .flatMap((subRecipe) => subRecipe.ingredients)
      .map((ingredient) => ingredient.id);
    await updateGroceryList.mutateAsync(groceries);
  };

  const handleAddToFavoriteClick = async () => {
    let favorites = user.favorites.map((recipe) => recipe.id);
    console.log("org", favorites);
    if (infavorites) {
      favorites.filter((f) => f != recipe.id);
    } else {
      favorites.push(recipe.id);
    }
    console.log("after", favorites);
    setInFavorites(!infavorites);
    await updateFavorites.mutateAsync(favorites);
  };

  return (
    <div className="w-full h-full flex gap-5">
      <div className="w-1/3 space-y-4 overflow-y-auto pb-28 p-3 bg-bookBase-light text-bookBase-darkest">
        <Breadcrumb />
        <img
          src={recipe.image}
          alt={recipe.title}
          className=" rounded-md aspect-auto object-cover"
        />

        <div className=" flex flex-wrap gap-4 w-full justify-evenly ">
          <BasicTooltip text="Legg til i handlelisten">
            <button
              className="flex flex-col items-center"
              onClick={handleAddToGroceryListClick}
            >
              <MdLocalGroceryStore size={20} />
              {/* <p> legg til i handlelisten</p> */}
            </button>
          </BasicTooltip>

          <BasicTooltip text="Legg til i favoriter">
            <button
              className="flex flex-col items-center"
              onClick={handleAddToFavoriteClick}
            >
              {infavorites ? (
                <MdFavorite size={20} />
              ) : (
                <MdFavoriteBorder size={20} />
              )}
              {/* <p> legg til i favoriter</p> */}
            </button>
          </BasicTooltip>
        </div>

        <div className=" flex flex-wrap gap-4 w-full justify-evenly ">
          <li className="flex flex-col items-center">
            <PiCookingPot size={25} />
            <p>{recipe.cooktime} min</p>
          </li>
          <li className="flex flex-col items-center">
            <MdDinnerDining size={25} />
            <p>{recipe.cuisine}</p>
          </li>
          <li className="flex flex-col items-center">
            <GiKnifeFork size={25} />
            <p>{recipe.type}</p>
          </li>
        </div>
        <p>{recipe.description}</p>
        <IngredientList recipe={recipe} />
      </div>

      <div className="overflow-auto w-2/3">
        <h2>{recipe.title}</h2>
        <InstructionList subRecipes={recipe.subRecipes} />
      </div>
    </div>
  );
};
export default RecipeDetails;
