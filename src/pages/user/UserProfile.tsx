import { useEffect, useState } from "react";

import { User } from "../../types/UserType";
import OpenBook from "../book/OpenBook";
import { useGetAllUsers } from "../../services/user/getUser";

function UserProfile() {
  const userHook = useGetAllUsers();
  const [user, setUser] = useState<User[]>([]);

  useEffect(() => {
    if (!userHook.isLoading && userHook.data) {
      setUser([...(userHook.data as User[])]);
    }
  }, [userHook.data, userHook.isLoading, userHook.isStale]);

  console.log(user);
  return (
    <OpenBook>
      <div></div>
    </OpenBook>
  );
}
export default UserProfile;
