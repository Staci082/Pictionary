import { useState } from "react";
import BrushTypeMenu from "./BrushTypeMenu";
import BrushSizeMenu from "./BrushSizeMenu";
import ColorMenu from "./ColorMenu";

function Canvas() {
    const [selectedColor, setSelectedColor] = useState<string>();
    const [selectedBrushSize, setSelectedBrushSize] = useState<string>();
    const [selectedBrushType, setSelectedBrushType] = useState<string>();

    const handleColorSelect = (color: string) => {
        setSelectedColor(color);
    };

    const handleBrushSizeSelect = (size: string) => {
        setSelectedBrushSize(size);
    };

    const handleBrushTypeSelect = (type: string) => {
        setSelectedBrushType(type);
    };

    // WORKING MENU'S GRAB THIS
    console.log(selectedColor || "black");
    console.log(selectedBrushSize || "10px");
    console.log(selectedBrushType || "pencil");

    return (
        <>
            {/* canvas */}
            <div className="flex flex-col gap-1">
                <div className="w-full rounded-sm lg:h-96 sm:h-80  md:min-w-[500px] h-64 bg-white"></div>

                {/* canvas options */}
                <div className="flex  items-center justify-between h-[60px] w-full">
                    <div className="w-1/2 flex gap-3 items-center h-full">
                        <ColorMenu onColorSelect={handleColorSelect} />

                        <BrushSizeMenu
                            onBrushSizeSelect={handleBrushSizeSelect}
                        />
                    </div>

                    {/* brush type */}
                    <div className="w-1/2 h-10 rounded-sm flex items-center justify-end gap-4">
                        <BrushTypeMenu onBrushTypeSelect={handleBrushTypeSelect}/>

                        {/* reset canvas */}
                        <div className="h-10 w-10">
                            <button
                                style={{
                                    backgroundImage: `url("./trash.avif")`,
                                    backgroundSize: "contain",
                                    backgroundRepeat: "no-repeat",
                                }}
                                className="h-10 w-10 focus:bg-indigo-600 rounded-xl"
                            ></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Canvas;
