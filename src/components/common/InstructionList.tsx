import { SubRecipe } from "../../types/RecipeType";
import InstructionListItem from "./InstructionListItem";

interface InstructionListProps {
  subRecipes: SubRecipe[];
}

const InstructionList: React.FC<InstructionListProps> = ({ subRecipes }) => {
  return (
    <div className=" overflow-y-auto pb-40 ">
      {subRecipes.map((subRecipe) => (
        <ol key={`subRecipe_${subRecipe.id}`}>
          <p>{subRecipe.title}</p>
          {subRecipe.instructions.split("\\n").map((step, index) => (
            <InstructionListItem
              key={`subRecipe_${subRecipe.id}-step_${step}`}
              instruction={step}
              index={index}
            ></InstructionListItem>
          ))}
        </ol>
      ))}
    </div>
  );
};
export default InstructionList;
