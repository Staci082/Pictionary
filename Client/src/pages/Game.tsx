import Canvas from "../components/Canvas";
import Chat from "../components/Chat";
import Players from "../components/Players";

function Game() {
    return (
        <>
            <div className="w-screen min-h-screen py-8 flex flex-col items-center justify-center gap-4">
                {/* header */}
                <div className="w-[90%] h-12 relative flex items-center justify-center bg-white rounded-sm">
                    Word
                </div>

                <div className="w-[90%] flex flex-col gap-4 lg:flex-row">
                    <div className="lg:w-[400px] hidden rounded-sm h-12 bg-blue-200 lg:flex items-center justify-center relative">
                        <Players />
                    </div>
                    <Canvas />

                    <div className="w-[500px] relative lg:flex hidden h-96 bg-blue-200">
                        <Chat />
                    </div>
                    {/* mobile player info + chat */}
                    <div className="flex gap-4 lg:hidden">
                        {/* player info */}
                        <div className="w-2/5 lg:hidden rounded-sm sm:h-12 h-10 bg-blue-200 flex items-center justify-center relative">
                            <Players />
                        </div>
                        {/* chat */}
                        <div className=" w-2/3 relative lg:hidden rounded-sm h-96 bg-blue-200">
                            <Chat />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Game;
