import axios from "axios";
import { User } from "../../types/UserType";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../context/client";

const appUserApi = axios.create({
  baseURL: `${import.meta.env.VITE_DB_URL}/appuser`,
});

export const useUpdateUserById = (userId: number) => {
  const putUser = async (userId: number, data: User) => {
    try {
      const response = await appUserApi.put(`/update/${userId}`, data, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Response ", response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const result = useMutation({
    mutationKey: ["putUser"],
    mutationFn: async (data: User) => await putUser(userId, data),
    retry: 0,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get", "users"] });
    },
  });
  return result;
};

export const useUpdateGroceryList = (userId: number) => {
  const putGroceryList = async (userId: number, data: number[]) => {
    try {
      const response = await appUserApi.put(
        `/update/groceryList/${userId}`,
        {
            ingredientQuantityIds: data
          },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Response ", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const result = useMutation({
    mutationKey: ["putGroceryList"],
    mutationFn: async (data: number[]) => await putGroceryList(userId, data),
    retry: 0,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get", "users"] });
    },
  });
  return result;
};

export const useUpdateFavorites = (userId: number) => {
  const putFavorites= async (userId: number, data: number[]) => {
    try {
      const response = await appUserApi.put(
        `/update/favorites/${userId}`,
        {
            recipeIds: data
          },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Response ", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const result = useMutation({
    mutationKey: ["putGroceryList"],
    mutationFn: async (data: number[]) => await putFavorites(userId, data),
    retry: 0,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get", "users"] });
    },
  });
  return result;
};
