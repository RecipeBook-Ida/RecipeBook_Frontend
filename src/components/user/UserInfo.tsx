import { User } from "../../types/UserType";
import RecipeCardGroup from "../common/Recipe/RecipeCardGroup";

interface UserInfoProps {
  user: User;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <div className="flex flex-col">
      <h2>{user.firstname + " " + user.lastname}</h2>
      <p>{user.username}</p>
      <h3>Dine oppskrifter</h3>

      <RecipeCardGroup recipes={user.recipes} key={`User_${user.id}`}></RecipeCardGroup>
    </div>
  );
};
export default UserInfo;
