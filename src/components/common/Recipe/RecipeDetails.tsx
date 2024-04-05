import { Recipe } from "../../../types/RecipeType";
import IngredientList from "../../IngredientList";
import Breadcrumb from "../Breadcrumb";
import InstructionList from "../InstructionList";
import { PiCookingPot } from "react-icons/pi";
import { GiKnifeFork } from "react-icons/gi";
import { MdDinnerDining } from "react-icons/md";
import { useGetUserById } from "../../../services/user/getUser";
import { useEffect, useState } from "react";
import { User } from "../../../types/UserType";
import { useUpdateGroceryList } from "../../../services/user/putUser";

interface RecipeDetailsProps {
  recipe: Recipe;
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipe }) => {
  const userHook = useGetUserById(1);
  const [user, setUser] = useState<User>();
  const updateGroceryList = useUpdateGroceryList(1);

  useEffect(() => {
    if (!userHook.isLoading && userHook.data) {
      setUser(userHook.data as User);
    }
  }, [userHook.data, userHook.isLoading, userHook.isStale]);

  const handleAddToGroceryListClick = async () => {
    const groceries = recipe.subRecipes
      .flatMap((subRecipe) => subRecipe.ingredients)
      .map((ingredient) => ingredient.id);
    const updatedUser = await updateGroceryList.mutateAsync(groceries);
    setUser(updatedUser);
  };

  return (
    <div className="w-full h-full">
      <Breadcrumb />
      <h2>{recipe.title}</h2>

      <div className="flex gap-5 pt-2 h-full">
        <div className=" w-1/2  overflow-y-auto pb-40 space-y-2 gap-5">
          <div className=" space-y-4 ">
            <img
              src={recipe.image}
              alt={recipe.title}
              className=" rounded-md aspect-auto object-cover bg-white"
            />

            <button onClick={handleAddToGroceryListClick}>
              legg til i handlelisten
            </button>
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
          </div>

          <IngredientList recipe={recipe} key={recipe.id}></IngredientList>
        </div>

        <InstructionList
          subRecipes={recipe.subRecipes}
          key={recipe.id}
        ></InstructionList>
      </div>
    </div>
  );
};
export default RecipeDetails;
