import React, { useState } from "react";
import { FaCircle } from "react-icons/fa";

interface BrushMenuProps {
    onBrushSizeSelect: (size: string) => void;
}

const BrushSizeMenu: React.FC<BrushMenuProps> = ({ onBrushSizeSelect }) => {
    const [brushMenuOpen, setBrushMenuOpen] = useState(false);
    const [selectedBrushSize, setSelectedBrushSize] = useState<string>("10px");

    const brushSizes: string[] = ["10px", "20px", "30px"];

    const toggleMenu = () => {
        setBrushMenuOpen(!brushMenuOpen);
    };

    const selectOption = (option: string) => {
        setSelectedBrushSize(option);
        onBrushSizeSelect(option);
        setBrushMenuOpen(false);
    };

    return (
        <>
            {brushSizes.map((option, index) => (
                <button
                    key={index}
                    onClick={() => selectOption(option)}
                    className={`text-white h-10 w-10 flex items-center rounded-xl justify-center sm:flex w-10 hidden ${
                        option === selectedBrushSize
                            ? "bg-indigo-600 h-10"
                            : "10px"
                    }
                `}
                >
                    <FaCircle size={option} />
                </button>
            ))}

            {/* mobile brush menu */}
            <div className="relative sm:hidden flex flex-row">
                <button
                    onClick={toggleMenu}
                    className={`text-white w-10 flex items-center rounded-lg justify-center flex cursor-pointer 
        ${selectedBrushSize ? "bg-indigo-600 h-10" : ""}
        `}
                >
                    {<FaCircle size={selectedBrushSize} />}
                </button>
                {brushMenuOpen && (
                    <ul className="absolute bottom-0 left-0 w-12 bg-indigo-600 rounded">
                        {brushSizes.map((option, index) => (
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
        </>
    );
};

export default BrushSizeMenu;
