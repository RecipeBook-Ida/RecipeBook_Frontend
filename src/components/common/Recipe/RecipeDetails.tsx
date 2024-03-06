import { Recipe } from "../../../types/RecipeType";
import IngredientList from "../../IngredientList";
import Breadcrumb from "../Breadcrumb";
import InstructionList from "../InstructionList";
import { PiCookingPot } from "react-icons/pi";
import { GiKnifeFork } from "react-icons/gi";
import { MdDinnerDining } from "react-icons/md";
import { CgBowl } from "react-icons/cg";

interface RecipeDetailsProps {
  recipe: Recipe;
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipe }) => {
  return (
    <div className="w-full h-full">
      <Breadcrumb />
      <h2>{recipe.title}</h2>

      <div className="grid grid-cols-2 col-span-2 gap-5 pt-2 h-full">
        <div className="grid grid-cols-2 space-y-2 gap-5">
          <div className=" space-y-4 ">
            <img
              src={recipe.image}
              alt={recipe.title}
              className=" rounded-md aspect-auto object-cover bg-white"
            />

            <div className=" flex flex-wrap gap-4 w-full justify-evenly ">
              <li className="flex flex-col items-center">
                <CgBowl size={25} />
                <p>{recipe.portion} porsjoner</p>
              </li>
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
          </div>

          <div className="flex flex-wrap gap-6">
            <IngredientList subRecipes={recipe.subRecipes}></IngredientList>
          </div>
        </div>

        <InstructionList subRecipes={recipe.subRecipes}></InstructionList>
      </div>
    </div>
  );
};
export default RecipeDetails;
