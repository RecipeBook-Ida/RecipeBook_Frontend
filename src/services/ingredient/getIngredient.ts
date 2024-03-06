import { useQuery } from "@tanstack/react-query";
const dbUrl = import.meta.env.VITE_DB_URL + "/ingredient"

export const getAllIngredients = async (): Promise<any> => {
      const res = await fetch(dbUrl , {
        method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            //authorization: "bearer " +  token,
          },
      }).then((data) => data.json());
      return await res
      

};
export const getIngredientById = async ( id?: number) => {
  return await fetch(dbUrl + `/${id}` , {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //authorization: "bearer " + token,
      },
  }).then();
};

export const useGetAllIngredients = () => {
  return  useQuery({ 
    queryKey: ["Get", "Ingredients"], //key for å hent cache
    queryFn:  async () => await getAllIngredients(),
  });
};

export const useGetIngredientById = (id?: number) => {
  return  useQuery({ 
    queryKey: ["Get", "Ingredient", id], //key før å hent cache
    queryFn: () => getIngredientById(id),
    enabled: false // disable this query from automatically running
});
};