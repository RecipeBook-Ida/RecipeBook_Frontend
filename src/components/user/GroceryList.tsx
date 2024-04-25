import { IngredientQuantity } from "../../types/Ingredient";

interface GroceryListProps {
  groceries: IngredientQuantity[];
}

const GroceryList: React.FC<GroceryListProps> = ({ groceries }) => {
  return (
    <div className="flex items-center flex-col">
      <h3>Handleliste</h3>

      {groceries.map((grocery) => (
        <ol key={`grocery_${grocery.id}`}>
          <p>
            {grocery.quantity + grocery.unit + " " + grocery.ingredient.name}
          </p>
        </ol>
      ))}
    </div>
  );
};
export default GroceryList;
