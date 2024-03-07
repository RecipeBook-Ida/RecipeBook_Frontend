import { Collapse } from "@mui/material";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { TransitionGroup } from "react-transition-group";

interface StepperProps {
  text: string;
  index: number;
  header?: string;
}

const Stepper: React.FC<StepperProps> = ({
  text,
  index,
  header = "Steg" + (index + 1),
}) => {
  const [activeStep, setActiveStep] = useState<boolean>(true);

  return (
    <li onClick={() => setActiveStep(!activeStep)}>
      <div className=" flex flex-row gap-5 items-center">
        <button className=" rounded-full w-8 flex justify-center items-center bg-bookAccent-lightest text-white aspect-square">
          {activeStep ? index + 1 : <FaCheck />}
        </button>
        <h4>{header}</h4>
      </div>
      <TransitionGroup className="ml-4 my-2 pl-9 border-l py-1">
        {activeStep && <Collapse>{text}</Collapse>}
      </TransitionGroup>
    </li>
  );
};
export default Stepper;
