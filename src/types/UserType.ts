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
      id: 6,
      title: "Chocolate Lava Cake",
      description:
        "Indulgent chocolate cakes with a gooey, molten center that oozes out when cut.",
      image: "https://example.com/chocolate-lava-cake.jpg",
    },
    {
      id: 3,
      title: "Vegetable Curry",
      description:
        "A flavorful vegetarian curry made with mixed vegetables and aromatic spices.",
      image: "https://example.com/vegetable-curry.jpg",
    },
    {
      id: 2,
      title: "Chicken Fajitas",
      description:
        "Tender chicken strips with colorful bell peppers and onions, seasoned with fajita spices.",
      image:
        "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2020/02/Chicken-Fajitas-7.jpg",
    },
    {
      id: 4,
      title: "Grilled Salmon with Lemon Butter Sauce",
      description:
        "Delicious grilled salmon fillets topped with a tangy lemon butter sauce.",
      image: "https://example.com/grilled-salmon.jpg",
    },
    {
      id: 5,
      title: "Caprese Salad",
      description:
        "A simple and refreshing salad made with ripe tomatoes, fresh mozzarella, and fragrant basil.",
      image: "https://example.com/caprese-salad.jpg",
    },
    {
      id: 1,
      title: "Spaghetti Carbonara",
      description: "Classic Italian pasta dish with bacon, eggs, and cheese.",
      image:
        "https://res.cloudinary.com/norgesgruppen/images/c_scale,dpr_auto,f_auto,q_auto:eco,w_auto/b4golm8sdghdq1vzivxz/klassisk-pasta-carbonara",
    },
  ],
  favorites: [],
};
