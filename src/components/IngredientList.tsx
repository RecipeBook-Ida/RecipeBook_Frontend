import { SubRecipe } from "../types/RecipeType";

interface IngredientListProps {
  subRecipes: SubRecipe[];
}

const IngredientList: React.FC<IngredientListProps> = ({ subRecipes }) => {
  return (
    <div className=" space-y-8">
      {subRecipes.map((subRecipe) => (
        <ol key={`subRecipe_${subRecipe.id}`}>
          <h3>{subRecipe.title}</h3>
          {subRecipe.ingredients.map((ingredient) => (
            <li
              className=" grid grid-cols-2 border-b-2"
              key={`subRecipe_${subRecipe.id}-ingredient_${ingredient.id}`}
            >
              <p>{ingredient.quantity + " " + ingredient.unit}</p>
              <p>{ingredient.ingredient.name}</p>
            </li>
          ))}
        </ol>
      ))}
    </div>
  );
};
export default IngredientList;
