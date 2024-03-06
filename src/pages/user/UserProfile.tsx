import { useEffect, useState } from "react";
import { useGetAllUsers } from "../../services/user/getUsers";
import { User } from "../../types/UserType";
import OpenBook from "../book/OpenBook";

function UserProfile() {
  const userHook = useGetAllUsers();
  const [user, setUser] = useState<User[]>([]);

  useEffect(() => {
    if (!userHook.isLoading && userHook.data) {
      setUser([...(userHook.data as User[])]);
    }
  }, [userHook.data, userHook.isLoading, userHook.isStale]);

  console.log(user)
  return (
    <OpenBook>
      <div>
        
      </div>
    </OpenBook>
  );
}
export default UserProfile;
