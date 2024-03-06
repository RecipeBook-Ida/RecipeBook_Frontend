import { ReactNode, useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface NumberInputProps {
  defaultValue: number;
  min?: number;
  text?: string;
  icon?: ReactNode;
  setValue?: (value: number) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({
  defaultValue,
  min,
  text,
  icon,
  setValue,
}) => {
  const [input, setInput] = useState<number>(defaultValue);

  useEffect(() => {
    setValue && input && setValue(input);
  }, [input]);

  const handleAddClick = () => {
    setInput(input + 1);
  };
  const handleRemoveClick = () => {
    if (input - 1 > 0) setInput(input - 1);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = parseInt(event.target.value);
    if (!isNaN(newInput) || event.target.value === "") {
      setInput(newInput);
    }
  };

  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const newInput = parseInt(event.target.value);
    if (!isNaN(newInput)) {
      setInput(newInput);
    } else {
      // Reset to default input if input is not a valid number
      setInput(defaultValue);
    }
  };
  return (
    <div className="flex flex-row ">
      <label className="flex flex-row items-center">
        <div className=" flex flex-col items-center">
          <button onClick={handleAddClick}>
            <IoIosArrowUp />
          </button>
          <input
            type="number"
            value={input}
            min="1"
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className=" bg-transparent text-lg w-8 aspect-square text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          ></input>
          <button onClick={handleRemoveClick}>
            <IoIosArrowDown />
          </button>
        </div>
        <div className=" relative flex justify-center">
          <div className=" absolute bottom-6">{icon}</div>
          <p>{text}</p>
        </div>
      </label>
    </div>
  );
};
export default NumberInput;
