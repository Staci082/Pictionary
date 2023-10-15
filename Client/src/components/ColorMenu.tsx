import { useState } from "react";

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

            {/* mobile brush colors */}
            <div className="w-full sm:hidden flex gap-3 relative">
                <div
                    style={{ backgroundColor: selectedColor || "black" }}
                    className="sm:hidden h-[40px] w-[40px]"
                ></div>

                {/* color menu button */}
                <button
                    className="sm:hidden h-[40px] w-[40px] focus:bg-indigo-600 rounded-lg"
                    onClick={toggleMenu}
                    style={{
                        backgroundImage: `url("./paint.avif")`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                    }}
                ></button>

                {/* color menu pop up */}
                {isOpen && (
                    <ul className="absolute bg-indigo-600 bottom-[53px] w-auto h-auto p-3 flex items-center bg-indigo-600 rounded">
                        {brushColors.map((option, index) => (
                            <li
                                key={index}
                                onClick={() => selectColor(option)}
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
        </>
    );
};

export default ColorMenu;
