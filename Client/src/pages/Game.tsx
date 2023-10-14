import Canvas from "../components/Canvas"
import Chat from "../components/Chat"

function Game() {

    return (
        <>
            <div className="w-screen min-h-screen py-8 flex flex-col items-center justify-center gap-4">
                {/* header */}
                <div className="w-[85%] h-12 relative flex items-center justify-center bg-white rounded-sm">
                    Word
                </div>

                <div className="w-[85%] flex flex-col gap-4 lg:flex-row">
                    {/* player info */}
                    <div className="w-[400px] hidden rounded-sm h-12 bg-blue-200 lg:flex items-center justify-center relative">
                        <div className="flex flex-col">
                            <b className="text-sm">Username</b>
                            <p className="text-sm">Points: 100</p>
                        </div>
                        <img
                            src="/face3.avif"
                            alt="player avatar"
                            className="w-8 absolute right-2 top-2 rounded-lg"
                        />
                    </div>
                  
                  <Canvas/>

                  <div className="w-[500px] relative lg:flex hidden h-96 bg-blue-200">
                  <Chat/>
                  </div>
                    {/* mobile player info + chat */}
                    <div className="flex gap-4 lg:hidden">
                        {/* player info */}
                        <div className="w-2/5 lg:hidden rounded-sm sm:h-12 h-10 bg-blue-200 flex items-center justify-center relative">
                            <div className="flex flex-col">
                                <b className="text-xs">Username</b>
                                <p className="text-xs">Points: 100</p>
                            </div>
                            <img
                                src="/face3.avif"
                                alt="player avatar"
                                className="sm:w-8 w-6 absolute sm:right-2 sm:top-2 right-1 rounded-lg"
                            />
                        </div>
                        {/* chat */}
                        <div className=" w-2/3 relative lg:hidden rounded-sm h-96 bg-blue-200">
                        <Chat/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Game;
