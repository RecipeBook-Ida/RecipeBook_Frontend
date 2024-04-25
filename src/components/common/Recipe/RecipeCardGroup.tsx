import { Recipe, RecipeList } from "../../../types/RecipeType";
import RecipeCard from "./RecipeCard";


interface RecipeCardGroupProps {
  recipes: RecipeList[] | Recipe[];
  size?: "small" | "large";
}

const RecipeCardGroup: React.FC<RecipeCardGroupProps> = ({
  recipes,
  size = "small",
}) => {
  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} size={size} />
      ))}
    </div>
  );
};
export default RecipeCardGroup;
