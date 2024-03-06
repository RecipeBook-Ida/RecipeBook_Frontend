import { Link } from "react-router-dom";
import { Recipe } from "../../../types/RecipeType";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <Link to={`/oppskrifter/${recipe.id}`}>
      <div className="w-60 h-fit self-center bg-white text-center text-pretty text-bookPrimary p-4 space-y-4 rounded-md">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-60 h-32 rounded-md aspect-auto object-cover bg-white"
        />
        <h3>{recipe.title}</h3>
        {/* <small>{recipe.description}</small> */}
      </div>
    </Link>
  );
};
export default RecipeCard;
