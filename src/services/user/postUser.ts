import axios from "axios";
import { User } from "../../types/UserType";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../context/client";

const appUserApi = axios.create({
  baseURL: `${import.meta.env.VITE_DB_URL}/appuser`,
});

export const usePostUser = () => {
  const postUser = async (data: User) => {
    try {
      const response = await appUserApi.put(``, data, {
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
    mutationFn: async (data: User) => await postUser(data),
    retry: 0,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get", "users"] });
    },
  });
  return result;
};
