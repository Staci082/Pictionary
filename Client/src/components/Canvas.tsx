import { FaCircle } from "react-icons/fa";
import BrushSizeMenu from "./BrushSizeMenu";
import ColorMenu from "./ColorMenu";

function Canvas() {

    return (
        <>
            {/* canvas */}
            <div className="flex flex-col gap-1">
                <div className="w-full rounded-sm lg:h-96 sm:h-80  md:min-w-[500px] h-64 bg-white"></div>
                {/* canvas options */}

                <div className="flex items-center h-[60px] w-full">
                
                <ColorMenu/>

                    {/* brush type */}
                    <div className="w-full h-14 rounded-sm gap-1 flex items-center justify-around">
                        
                            <button
                                style={{
                                    backgroundImage: `url("./pencil.avif")`,
                                    backgroundSize: "contain",
                                    backgroundRepeat: "no-repeat",
                                }}
                                className="h-10 w-10 focus:bg-indigo-600 rounded-lg"
                            ></button>

                            <button
                                style={{
                                    backgroundImage: `url("./eraser.avif")`,
                                    backgroundSize: "contain",
                                    backgroundRepeat: "no-repeat",
                                }}
                                className="h-10 w-10 focus:bg-indigo-600 rounded-lg"
                            ></button>

                        {/* brush sizes */}
                        <button className="text-white h-10 w-10 flex items-center rounded-lg justify-center sm:flex w-10 hidden focus:bg-indigo-600">
                            <FaCircle size={12} />
                        </button>
                        <button className="text-white h-10 w-10 flex items-center rounded-lg justify-center sm:flex w-10 hidden focus:bg-indigo-600">
                            <FaCircle size={20} />
                        </button>
                        <button className="text-white h-10 w-10 flex items-center rounded-lg justify-center sm:flex w-10 hidden focus:bg-indigo-600">
                            <FaCircle size={28} />
                        </button>

                        <BrushSizeMenu/>

                        {/* reset canvas */}
                        <button
                            style={{
                                backgroundImage: `url("./trash.avif")`,
                                backgroundSize: "contain",
                                backgroundRepeat: "no-repeat",
                            }}
                            className="h-10 w-10 focus:bg-indigo-600 rounded-lg"
                        ></button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Canvas;
