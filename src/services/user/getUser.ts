import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const appUserApi = axios.create({
  baseURL: `${import.meta.env.VITE_DB_URL}/appuser`,
});

export const getAllUsers = async (): Promise<any> => {
  try {
    const response = await appUserApi.get(``, {
      timeout: 5000,
    });

    console.log("API Response:", response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (userId: number) => {
  try {
    const response = await appUserApi.get(`/${userId}`, {
      timeout: 5000,
    });

    console.log("API Response:", response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["get", "appuser"], //key for å hent cache
    queryFn: async () => await getAllUsers(),
  });
};

export const useGetUserById = (id: number) => {
  return useQuery({
    queryKey: ["get", "appuser", id], //key før å hent cache
    queryFn: () => getUserById(id),
    enabled: true, // disable this query from automatically running
  });
};
