import { IngredientQuantity } from "./Ingredient";
import { RecipeList } from "./RecipeType";

export type User = {
  id: number;
  image: string;
  username: string;
  firstname: string;
  lastname: string;
  groceryList: IngredientQuantity[];
  recipes: RecipeList[];
  favorites: RecipeList[];
};

export type UserList = {
  id: number;
  image: string;
  username: string;
};

export const dummyUser = {
  id: 1,
  image: "https://example.com/chocolate-lava-cake.jpg",
  username: "idap",
  firstname: "Ida",
  lastname: "L",
  groceryList: [],
  recipes: [
    {
      id: 0,
      title: "Chocolate Lava Cake",
      description: "Indulgent chocolate cakes with a gooey, molten center that oozes out when cut.",
      cooktime: 0,
      image: "https://example.com/chocolate-lava-cake.jpg",
      cuisine: "string",
      type: "string",
      portion: 0
    },
    {
      id: 1,
      title: "Vegetable Curry",
      description: "A flavorful vegetarian curry made with mixed vegetables and aromatic spices.",
      cooktime: 0,
      image: "https://example.com/vegetable-curry.jpg",
      cuisine: "string",
      type: "string",
      portion: 0
    },
    {
      id: 2,
      title: "Chicken Fajitas",
      description: "Tender chicken strips with colorful bell peppers and onions, seasoned with fajita spices.",
      cooktime: 0,
      image: "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2020/02/Chicken-Fajitas-7.jpg",
      cuisine: "string",
      type: "string",
      portion: 0
    },
    {
      id: 3,
      title: "Grilled Salmon with Lemon Butter Sauce",
      description: "Delicious grilled salmon fillets topped with a tangy lemon butter sauce.",
      cooktime: 0,
      image: "https://example.com/grilled-salmon.jpg",
      cuisine: "string",
      type: "string",
      portion: 0
    },
    {
      id: 4,
      title: "Caprese Salad",
      description: "A simple and refreshing salad made with ripe tomatoes, fresh mozzarella, and fragrant basil.",
      cooktime: 0,
      image: "https://example.com/caprese-salad.jpg",
      cuisine: "string",
      type: "string",
      portion: 0
    },
    {
      id: 5,
      title: "Spaghetti Carbonara",
      description: "Classic Italian pasta dish with bacon, eggs, and cheese.",
      cooktime: 0,
      image: "https://res.cloudinary.com/norgesgruppen/images/c_scale,dpr_auto,f_auto,q_auto:eco,w_auto/b4golm8sdghdq1vzivxz/klassisk-pasta-carbonara",
      cuisine: "string",
      type: "string",
      portion: 0
    },
  ],
  favorites: [],
};
