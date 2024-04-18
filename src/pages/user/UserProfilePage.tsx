import { useEffect, useState } from "react";
import { User } from "../../types/UserType";
import { useGetUserById } from "../../services/user/getUser";
import GroceryList from "../../components/user/GroceryList";

function UserProfilePage() {
  const userHook = useGetUserById(1);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (!userHook.isLoading && userHook.data) {
      setUser(userHook.data as User);
    }
  }, [userHook.data, userHook.isLoading, userHook.isStale]);

  if (userHook.isPending || !user) return "Loading...";

  if (userHook.error) return "An error has occurred: " + userHook.error.message;

  return (
    <>
      <GroceryList groceries={user.groceryList} />
    </>
  );
}
export default UserProfilePage;
