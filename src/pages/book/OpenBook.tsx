import { ReactNode } from "react";

interface OpenBookProps {
  children: ReactNode;
}

const OpenBook: React.FC<OpenBookProps> = ({ children }) => {
  return (
    <div className="p-6 pt-0 h-full w-full">

      <div className=" bg-bookBG pl-2 pr-2 h-full rounded-2xl shadow-sm shadow-black">
        <div className=" bg-bookBG pl-2 pr-2 h-full rounded-2xl shadow-sm shadow-black">
          <div className="  p-6 h-full rounded-2xl shadow-sm shadow-black grid xl:grid-cols-2 sm:grid-cols-1">  {/* bg-gradient-to-r from-bookBG via-black to-bookBG"> */}
            {children}
          </div>
        </div>
      </div>
      
    </div>
  );
};
export default OpenBook;
