import Canvas from "../components/Canvas";
import Chat from "../components/Chat";
import Players from "../components/Players";

function Game() {
    return (
        <>
            <div className="w-screen min-h-screen py-8 flex flex-col items-center justify-center gap-4">
                {/* header */}
                <div className="w-[90%] h-12 relative flex items-center justify-center bg-blue-200 rounded-sm">
                    Word
                </div>

                {/* main container */}
                <div className="w-[90%] flex flex-col gap-4 lg:flex-row">
                    {/* player info */}
                    <div className="lg:w-[400px] hidden rounded-sm lg:flex lg:flex-col">
                        <Players />
                        <Players />
                        <Players />
                        <Players />
                    </div>
                    <Canvas />
                    {/* chat */}
                    <div className="w-[500px] relative lg:flex hidden h-96 bg-blue-200">
                        <Chat />
                    </div>


                    {/* mobile container */}
                    <div className="flex gap-4 lg:hidden">
                        {/* mobile player info */}
                        <div className="w-2/4 lg:hidden">
                            <Players />
                            <Players />
                            <Players />
                            <Players />
                        </div>
                        {/* mobile chat */}
                        <div className=" w-2/3 relative lg:hidden rounded-sm h-64 bg-blue-200">
                            <Chat />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Game;
