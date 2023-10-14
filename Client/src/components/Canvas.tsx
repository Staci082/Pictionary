import { FaCircle } from "react-icons/fa";

function Canvas() {
    const brushColors: string[] = [
        "white",
        "gray",
        "red",
        "orange",
        "yellow",
        "lime",
        "cyan",
        "blue",
        "purple",
        "blue",
        "purple",
        "green",
    ];
    return (
        <>
            {/* canvas */}
            <div className="flex flex-col gap-1">
                <div className="w-full rounded-sm lg:h-96 sm:h-80  md:min-w-[500px] h-64 bg-blue-200"></div>
              {/* canvas options */}

                {/* brush colors */}
                <div className="flex w-full">
                <ul className="w-[300px] h-full flex flex-wrap">
                    {brushColors.map((color) => (
                        <li
                            key={color}
                            style={{ backgroundColor: color }}
                            className={`w-[30px] h-[30px] bg-${color}`}
                        ></li>
                    ))}
                </ul>

                {/* brush type */}
                <div className="w-full h-14 rounded-sm gap-1 flex">
                    <div className="w-1/3 gap-4 h-full flex items-center justify-center">
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
                    </div>
                    {/* brush sizes */}
                    <div className="w-2/3 h-full flex justify-around items-center">
                    
                    <button className="text-white flex items-center rounded-lg justify-center h-10 w-10 focus:bg-indigo-600"><FaCircle size={12}/></button>
                    <button className="text-white flex items-center rounded-lg justify-center h-10 w-10 focus:bg-indigo-600"><FaCircle size={20}/></button>
                    <button className="text-white flex items-center rounded-lg justify-center h-10 w-10 focus:bg-indigo-600"><FaCircle size={28}/></button>
                    
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
            </div>
        </>
    );
}

export default Canvas;
