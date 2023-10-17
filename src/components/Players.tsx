import { SocketProp } from "../context/SocketProp";
import { useState, useEffect } from "react";

// Define the type for a user object
interface User {
    username: string;
    avatar: string;
    id: string;
}

export default function Players({ socket }: SocketProp) {
    const [onlineUsers, setOnlineUsers] = useState<User[]>([]);

    useEffect(() => {
        socket.on("onlineUsers", (users: User[]) => {
            setOnlineUsers(users);
        });
    }, [socket]);

    useEffect(() => {
        console.log("online users: ", onlineUsers);
    }, [onlineUsers]);

    return (
        <>
            {onlineUsers.map((user) => (
                <div className="my-1 flex items-center justify-center rounded-sm h-12 bg-blue-200">
                    <div key={user.id} className="flex items-center justify-between w-full mx-2">
                    <div 
                    style={{
                        backgroundImage:`url("./pencil.avif")`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                    }}
                    className="sm:w-10 sm:h-10 w-7 h-7">
                    </div>
                        <div className="flex flex-col text-center">
                            <b className="sm:text-sm text-xs">{user.username}</b>
                            <p className="sm:text-sm text-xs">Points: 100</p>
                        </div>
                        <img src={user.avatar} alt="player avatar" className="sm:w-10 w-7 hover:scale-150 sm:rounded-xl rounded-lg" />
                    </div>
                </div>
            ))}
        </>
    );
}
