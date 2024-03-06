import { ReactNode } from "react";

interface ClosedBookProps {
  children: ReactNode;
}

const ClosedBook: React.FC<ClosedBookProps> = ({ children }) => {
  return (
    <div className="p-6 pt-0 h-full w-1/2 ">
      <div className=" bg-bookBG pl-2 pr-2 h-full rounded-2xl shadow-sm shadow-black">
        {children}
      </div>
    </div>
  );
};
export default ClosedBook;
