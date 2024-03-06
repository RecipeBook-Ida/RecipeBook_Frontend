import { useQuery } from "@tanstack/react-query";
const dbUrl = import.meta.env.VITE_DB_URL + "/recipes";

export const getAllRecipes = async (): Promise<any> => {
  const res = await fetch(dbUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      //authorization: "bearer " +  token,
    },
  }).then((data) => data.json());
  return await res;
};
export const getRecipeById = async (id?: number) => {
  const res = await fetch(dbUrl + `/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      //authorization: "bearer " + token,
    },
  }).then((data) => data.json());
  return res;
};

export const useGetAllRecipes = () => {
  return useQuery({
    queryKey: ["Get", "Recipes"], //key for å hent cache
    queryFn: async () => await getAllRecipes(),
  });
};

export const useGetRecipeById = (id?: number) => {
  const res = useQuery({
    queryKey: ["Get", "Recipe", id], //key før å hent cache
    queryFn: async () => await getRecipeById(id),
  });
  return res;
};
