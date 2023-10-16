import React, { useState } from "react";

interface ColorMenuProps {
    onColorSelect: (color: string) => void;
}

const ColorMenu: React.FC<ColorMenuProps> = ({ onColorSelect }) => {
    const brushColors = [
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
    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const selectColor = (option: string) => {
        setSelectedColor(option);
        onColorSelect(option);
        setIsOpen(false);
    };

    return (
        <>
            {/* brush colors */}
            <div className="flex gap-3 relative items-center">
                <div
                    style={{ backgroundColor: selectedColor || "black" }}
                    className=" h-[38px] w-[38px] rounded-lg"
                ></div>

                {/* color menu button */}
                <button
                    className=" h-[40px] w-[40px] focus:bg-indigo-600 rounded-xl"
                    onClick={toggleMenu}
                    style={{
                        backgroundImage: `url("./paint.avif")`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                    }}
                ></button>

                {/* color menu pop up */}
                {isOpen && (
                    <ul
                        className="absolute bottom-[53px] w-auto h-auto p-3 flex items-center bg-indigo-600 rounded"
                    >
                        {brushColors.map((option, index) => (
                            <li
                                key={index}
                                onClick={() => selectColor(option)}
                                className=" w-auto h-auto text-white flex flex-col justify-center items-center hover:bg-indigo-400 hover:rounded cursor-pointer"
                            >
                                <div
                                    style={{ backgroundColor: option }}
                                    className={` h-[24px] w-[24px]`}
                                ></div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export default ColorMenu;
