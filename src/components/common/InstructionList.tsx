import { SubRecipe } from "../../types/RecipeType";
import InstructionListItem from "./InstructionListItem";

interface InstructionListProps {
  subRecipes: SubRecipe[];
}

const InstructionList: React.FC<InstructionListProps> = ({ subRecipes }) => {
  return (
    <div className=" overflow-y-auto pb-40 space-y-10">
      {subRecipes.map((subRecipe) => (
        <InstructionListItem subRecipe={subRecipe} key={`subRecipe-${subRecipe.id}`}></InstructionListItem>
      ))}
    </div>
  );
};
export default InstructionList;
