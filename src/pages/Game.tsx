// import { useEffect } from "react";
import Canvas from "../components/Canvas/Canvas";
import Chat from "../components/Chat/Chat";
import Players from "../components/Players/Players";
import { SocketProp } from "../props/SocketProp";

function Game({ socket }: SocketProp) {
    // let disconnectTimeout: number | undefined;

    // useEffect(() => {
    //     const handleUserDisconnect = () => {
    //         // Handle the user disconnect event

    //         // Clear the existing disconnect timeout if it exists
    //         if (disconnectTimeout) {
    //             clearTimeout(disconnectTimeout);
    //         }

    //         // Set a new timeout to disconnect the user from the server after 10 seconds
    //         disconnectTimeout = setTimeout(() => {
    //             // Handle the disconnection logic
    //             // For example, you can clear the user's data or perform other actions
    //             // Then disconnect the socket if needed
    //         }, 10000); // 10 seconds
    //     };

    //     socket.on("disconnect", handleUserDisconnect);

    //     return () => {
    //         // Clean up the listener
    //         socket.off("disconnect", handleUserDisconnect);
    //     };
    // }, [socket]);
    return (
        <>
            <div className="w-screen min-h-screen py-8 flex flex-col items-center justify-center gap-4">
                {/* header */}
                <div className="w-[90%] h-12 relative flex items-center justify-center bg-blue-200 rounded-sm">Word</div>

                {/* main container */}
                <div className="w-[90%] flex flex-col gap-4 lg:flex-row">
                    {/* player info */}
                    <div className="lg:w-[400px] hidden rounded-sm lg:flex lg:flex-col">
                        <Players socket={socket} />
                    </div>

                    {/* <canvas */}
                    <Canvas />

                    {/* chat */}
                    <div className="w-[500px] relative lg:flex hidden h-96 py-5 bg-blue-200">
                        <Chat socket={socket} />
                    </div>

                    {/* mobile container */}
                    <div className="flex gap-4 lg:hidden">
                        {/* mobile player info */}
                        <div className="w-2/4 lg:hidden">
                            <Players socket={socket} />
                        </div>
                        {/* mobile chat */}
                        <div className=" w-2/3 relative lg:hidden rounded-sm h-96 mt-1 bg-blue-200">
                            <Chat socket={socket} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Game;
