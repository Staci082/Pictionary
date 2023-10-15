import React, { useState } from "react";
import { FaCircle } from "react-icons/fa";

const PopupMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options: string[] = ["12", "20", "28"];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };


  return (
    <div className="relative sm:hidden flex">
      <button
        onClick={toggleMenu}
        className="text-white w-10 flex items-center rounded-lg justify-center flex w-10  focus:bg-indigo-600 cursor-pointer"
      >
        {<FaCircle size={selectedOption}/>}
      </button>
      {isOpen && (
        <ul className="absolute bottom-[-6px] left-0 w-12 bg-indigo-600 rounded">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => selectOption(option)}
              className="px-4 py-4 w-full  text-white flex flex-col justify-center items-center hover:bg-indigo-400 hover:rounded cursor-pointer"
            >
              <FaCircle size={option} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PopupMenu;
