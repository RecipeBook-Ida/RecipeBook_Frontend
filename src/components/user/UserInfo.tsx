import { User } from "../../types/UserType";
import RecipeCardGroup from "../common/Recipe/RecipeCardGroup";

interface UserInfoProps {
  user: User;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <div className="flex flex-col">
      <div className=" bg-bookBase-light">
        <img
          src={user.image}
          alt={user.firstname}
          className="w-32 aspect-square object-cover bg-white rounded-full"
        />
        <h2>{user.firstname + " " + user.lastname}</h2>
        <p>{user.username}</p>
      </div>
      <h3>Dine oppskrifter</h3>
      <RecipeCardGroup
        recipes={user.recipes}
        key={`recipes_${user.id}`}
      ></RecipeCardGroup>

      <h3>Dine favoriter</h3>

      <RecipeCardGroup
        recipes={user.favorites}
        key={`favorites_${user.id}`}
      ></RecipeCardGroup>
    </div>
  );
};
export default UserInfo;
