import React, { useState } from "react";

interface BrushTypeMenuProps {
    onBrushTypeSelect: (size: string) => void;
    clearCanvas: () => void; 
}

const BrushTypeMenu: React.FC<BrushTypeMenuProps> = ({ onBrushTypeSelect, clearCanvas }) => {
    const [selectedBrushType, setSelectedBrushType] =
        useState<string>("pencil");

    const brushTypes: string[] = ["pencil", "eraser", "trash"];

    const selectOption = (option: string) => {
        setSelectedBrushType(option);
        onBrushTypeSelect(option);
    };

    const clearCanvasIfNeeded = (type: string) => {
        if (type === "trash") {
            clearCanvas();
        } 
    };
    return (
        <>
            {brushTypes.map((type, index) => (
                <button
                key={index}
                    onClick={() => {
                        selectOption(type);
                        clearCanvasIfNeeded(type);
                    }}
                    style={{
                        backgroundImage: `url("./${type}.avif")`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                    }}
                    className={`h-10 w-10 rounded-xl ${
                        selectedBrushType === type ? "bg-indigo-600 h-10" : ""
                    }
                `}
                ></button>
            ))}
        </>
    );
};

export default BrushTypeMenu;
