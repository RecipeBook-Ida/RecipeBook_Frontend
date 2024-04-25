import { RecipeList } from "../../../types/RecipeType";
import RecipeCard from "./RecipeCard";

interface RecipeCardGroupProps {
  recipes: RecipeList[];
}

const RecipeCardGroup: React.FC<RecipeCardGroupProps> = ({ recipes }) => {
  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};
export default RecipeCardGroup;
