import { Link } from "react-router-dom";
import { RecipeList } from "../../../types/RecipeType";
import { PiCookingPot } from "react-icons/pi";
import { MdDinnerDining } from "react-icons/md";
import placeholderImage from "../../../assets/recipe.jpg";

interface RecipeCardProps {
  recipe: RecipeList;
  size?: "small" | "large";
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, size = "large" }) => {
  const image = recipe.image ? recipe.image : placeholderImage;

  if (size == "large")
    return (
      <Link to={`/oppskrifter/${recipe.id}`}>
        <div className=" relative w-96 h-48 border-2 m-4 border-gray-300 p-2  shadow-md text-center text-bookPrimary rounded-md">
          <img
            src={image}
            alt={recipe.title}
            className=" absolute w-52 content-center -top-2 -left-12 rounded-full aspect-square object-cover bg-white shadow-2xl"
          />

          <div className=" w-[208px] h-[176px] right-0 absolute  overflow-hidden">
            <h3>{recipe.title}</h3>

            <div className=" flex flex-wrap gap-4 w-full justify-evenly border-y-2 p-1">
              <li className="flex flex-row items-center space-x-1">
                <PiCookingPot />
                <small>{recipe.cooktime} min</small>
              </li>
              <li className="flex flex-row items-center space-x-1">
                <MdDinnerDining />
                <small>{recipe.cuisine}</small>
              </li>
            </div>

            <small className="truncate text-wrap">{recipe.description}</small>
          </div>
        </div>
      </Link>
    );

  if (size == "small")
    return (
      <Link to={`/oppskrifter/${recipe.id}`}>
        <div className=" relative w-72 h-48 border-2 m-4 border-gray-300 p-2 overflow-hidden  shadow-md text-center text-bookPrimary rounded-md">
          <img
            src={image}
            alt={recipe.title}
            className=" absolute w-52 content-center -top-2 -left-20 rounded-full aspect-square object-cover bg-white shadow-2xl"
          />

          <div className=" w-[160px] h-[176px] right-0 absolute  overflow-hidden flex flex-col justify-center">
            <h3>{recipe.title}</h3>

            <div className=" flex flex-wrap gap-4 w-full justify-evenly border-y-2 p-1">
              <li className="flex flex-row items-center space-x-1">
                <PiCookingPot />
                <small>{recipe.cooktime} min</small>
              </li>
              <li className="flex flex-row items-center space-x-1">
                <MdDinnerDining />
                <small>{recipe.cuisine}</small>
              </li>
            </div>
          </div>
        </div>
      </Link>
    );
};
export default RecipeCard;
