import React, { useState } from "react";

const ColorMenu: React.FC = () => {
    const brushColors: string[] = [
      "black",
      "lightslategray",
        "white",
        "red",
        "orange",
        "yellow",
        "lime",
        "forestgreen",
        "hotpink",
        "purple",
        "blue",
        "saddlebrown",
    ];
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const selectOption = (option: string) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    return (
        <>
            <div className="w-full sm:hidden flex gap-3 relative">
                <div
                    style={{ backgroundColor: selectedOption || "black" }}
                    className="sm:hidden h-[40px] w-[40px]"
                ></div>
                <button
                    className="sm:hidden h-[40px] w-[40px] focus:bg-indigo-600 rounded-lg"
                    onClick={toggleMenu}
                    style={{
                        backgroundImage: `url("./paint.avif")`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                    }}
                ></button>
                {isOpen && (
                    <ul className="absolute bg-indigo-600 bottom-[53px] w-auto h-auto p-3 flex items-center bg-indigo-600 rounded">
                        {brushColors.map((option, index) => (
                            <li
                                key={index}
                                onClick={() => selectOption(option)}
                                className=" w-auto h-auto text-white flex flex-col justify-center items-center hover:bg-indigo-400 hover:rounded cursor-pointer"
                            >
                                <div
                                    style={{ backgroundColor: option }}
                                    className={`sm:hidden h-[24px] w-[24px]`}
                                ></div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {/* brush colors*/}
            <ul className="w-[300px] h-full sm:flex hidden flex flex-wrap">
                {brushColors.map((color) => (
                    <li
                        key={color}
                        style={{ backgroundColor: color }}
                        className={`w-[30px] h-[30px] cursor-pointer bg-${color}`}
                    ></li>
                ))}
            </ul>
        </>
        // <div className="relative sm:hidden flex">
        //   <button
        //     onClick={toggleMenu}
        //     className="text-white h-10 w-10 flex items-center rounded-lg justify-center flex w-10  focus:bg-indigo-600 cursor-pointer"
        //   >
        //     {selectedOption}
        //   </button>
        //   {isOpen && (
        //     <ul className="absolute bottom-0 left-0 w-10 bg-indigo-600 rounded">
        //       {brushColors.map((option, index) => (
        //         <li
        //           key={index}
        //           onClick={() => selectOption(option)}
        //           className="px-4 py-2 w-full h-10 text-white flex flex-col justify-center items-center hover:bg-indigo-400 hover:rounded cursor-pointer"
        //         >
        //           option
        //         </li>
        //       ))}
        //     </ul>
        //   )}
        // </div>
    );
};

export default ColorMenu;
