import { Collapse } from "@mui/material";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { TransitionGroup } from "react-transition-group";

interface InstructionListItemProps {
  instruction: string;
  index: number;
}

const InstructionListItem: React.FC<InstructionListItemProps> = ({
  instruction,
  index,
}) => {
  const [activeStep, setActiveStep] = useState<boolean>(true);

  return (
    <li onClick={() => setActiveStep(!activeStep)}>
      <div className=" flex flex-row gap-5 items-center">
        <button className=" rounded-full w-8 flex justify-center items-center bg-bookAccent-lightest text-white aspect-square">
          {activeStep ? index +1 : <FaCheck />}
        </button>
        <h3>Steg {index+1}</h3>
      </div>
      <TransitionGroup className="ml-4 my-2 pl-9 border-l py-1">{activeStep && <Collapse>{instruction}</Collapse> }</TransitionGroup>
      
    </li>
  );
};
export default InstructionListItem;