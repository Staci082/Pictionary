import { useState, useEffect } from "react";
import BrushTypeMenu from "./BrushTypeMenu";
import BrushSizeMenu from "./BrushSizeMenu";
import ColorMenu from "./ColorMenu";
import useOnDraw from "../hooks/useOnDraw";

function Canvas() {
    const [selectedColor, setSelectedColor] = useState<string>("black");
    const [selectedBrushSize, setSelectedBrushSize] = useState<string>("10px");
    const [selectedBrushType, setSelectedBrushType] =
        useState<string>("pencil");

    const handleColorSelect = (color: string) => {
        setSelectedColor(color);
    };

    const handleBrushSizeSelect = (size: string) => {
        setSelectedBrushSize(size);
    };

    const handleBrushTypeSelect = (type: string) => {
        setSelectedBrushType(type);
    };

    console.log(selectedColor);
    console.log(selectedBrushSize);
    console.log(selectedBrushType);

    const { onMouseDown, setCanvasRef } = useOnDraw(onDraw);

    // grab dimensions of canvas
    useEffect(() => {
        const canvas = document.querySelector("canvas");
        if (canvas) {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
    }, []);

    // pinpoint where user is drawing
    function onDraw(
        ctx: CanvasRenderingContext2D,
        point: { x: number; y: number },
        prevPoint: { x: number; y: number } | null
    ) {
        const brushSize = parseInt(selectedBrushSize, 10/2) || 5; 
        drawLine(prevPoint, point, ctx, brushSize);
    }

    // add line
    function drawLine(
        start: { x: number; y: number } | null,
        end: { x: number; y: number },
        ctx: CanvasRenderingContext2D,
        width: number
    ) {
        start = start ?? end;
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.strokeStyle =
            selectedBrushType === "pencil" ? selectedColor || "black" : "white"; // or else eraser white

        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();

        ctx.fillStyle =
            selectedBrushType === "pencil" ? selectedColor || "black" : "white";
        ctx.beginPath();

        {
            if (width === 10) {
                ctx.arc(start.x, start.y, 4, 0, 4 * Math.PI);
            } else if (width === 15) {
                ctx.arc(start.x, start.y, 8, 0, 8 * Math.PI);
            } else {
                ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI);
            }
        }

        ctx.fill();
    }

    return (
        <div className="flex flex-col gap-1">
            {/* drawing canvas */}
            <canvas
                onMouseDown={onMouseDown}
                ref={setCanvasRef}
                className="w-full rounded-sm lg:h-96 sm:h-80  md:min-w-[600px] h-64 bg-white"
            ></canvas>
            {/* canvas options */}
            <div className="flex items-center justify-between h-[60px] w-full">
                <div className="w-1/2 flex gap-3 items-center h-full">
                    <ColorMenu onColorSelect={handleColorSelect} />
                    <BrushSizeMenu onBrushSizeSelect={handleBrushSizeSelect} />
                </div>
                <div className="w-1/2 h-10 rounded-sm flex items-center justify-end gap-4">
                    <BrushTypeMenu onBrushTypeSelect={handleBrushTypeSelect} />
                </div>
            </div>
        </div>
    );
}

export default Canvas;
