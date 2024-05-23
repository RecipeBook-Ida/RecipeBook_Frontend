export type Ingredient = {
  id: number;
  name: string;
  image: string;
  category: string;
};

export type IngredientQuantity = {
  id: number;
  quantity: number;
  unit: string;
  ingredient: Ingredient;
};

export type IngredientQuantityPost = {
  [key: string]: string | number;
  quantity: number;
  unit: string;
  ingredientId: number;
};

export type IngredientQuantityValidPost = {
  [key: string]: boolean;
  quantity: boolean;
  unit: boolean;
  ingredientId: boolean;
};

export const dummyIngredients = [
  {
    id: 1,
    name: "Onion",
    image: "onion_image.jpg",
    category: "italiensk",
  },
  {
    id: 2,
    name: "Basil",
    image: "basil_image.jpg",
    category: "italiensk",
  },
  {
    id: 3,
    name: "Mozzarella",
    image: "mozzarella_image.jpg",
    category: "italiensk",
  },
  {
    id: 4,
    name: "Olive Oil",
    image: "olive_oil_image.jpg",
    category: "italiensk",
  },
  {
    id: 5,
    name: "Pasta",
    image: "pasta_image.jpg",
    category: "italiensk",
  },
  {
    id: 6,
    name: "Parmesan Cheese",
    image: "parmesan_cheese_image.jpg",
    category: "italiensk",
  },
];
