import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../context/client";
import { RecipePost } from "../../types/RecipeType";

const appRecipeApi = axios.create({
  baseURL: `${import.meta.env.VITE_DB_URL}/recipe`,
});

export const usePostRecipe = () => {
  const postRecipe = async (data: RecipePost) => {
    try {
      const response = await appRecipeApi.put(``, data, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Response ", response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const result = useMutation({
    mutationKey: ["postRecipe"],
    mutationFn: async (data: RecipePost) => await postRecipe(data),
    retry: 0,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get", "recipes"] });
    },
  });
  return result;
};
