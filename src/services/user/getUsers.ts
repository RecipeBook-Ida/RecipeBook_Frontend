import { useQuery } from "@tanstack/react-query";
const dbUrl = import.meta.env.VITE_DB_URL + "/appusers"

export const getAllUsers = async (): Promise<any> => {
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
export const getUserById = async ( id?: string) => {
  return await fetch(dbUrl + `/${id}` , {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //authorization: "bearer " + token,
      },
  }).then();
};

export const useGetAllUsers = () => {
  return  useQuery({ 
    queryKey: ["get", "appusers"], //key for å hent cache
    queryFn:  async () => await getAllUsers(),
  });
};

export const useGetUserById = (id?: string) => {
  return  useQuery({ 
    queryKey: ["get", "appusers", id], //key før å hent cache
    queryFn: () => getUserById(id),
    enabled: false // disable this query from automatically running
});
};