import { useState } from "react";
import Stepper from "./stepper";
import { SubRecipe } from "../../types/RecipeType";
import { IoIosArrowDown } from "react-icons/io";
import { TransitionGroup } from "react-transition-group";
import { Collapse } from "@mui/material";

interface InstructionListItemProps {
  subRecipe: SubRecipe;
}

const InstructionListItem: React.FC<InstructionListItemProps> = ({
  subRecipe,
}) => {
  const [activeStep, setActiveStep] = useState<boolean>(true);

  return (
    <ol key={`subRecipe_${subRecipe.id}`}>
      <h3
        className="flex  items-center"
        onClick={() => setActiveStep(!activeStep)}
      >
        {subRecipe.title} <IoIosArrowDown className={activeStep ? "rotate-180" : "rotate-0"} />
      </h3>

      <TransitionGroup className="">
        {activeStep && (
          <Collapse>
            {subRecipe.instructions.split("\\n").map((step, index) => (
              <Stepper text={step} index={index} key={`step-${index}`}></Stepper>
            ))}
          </Collapse>
        )}
      </TransitionGroup>
    </ol>
  );
};
export default InstructionListItem;
