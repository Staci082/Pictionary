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

        // ...
    }, [socket]);

    useEffect(() => {
        console.log("online users: ", onlineUsers);
    }, [onlineUsers]);

    return (
        <>
               {onlineUsers.map((user) => (
            <div className="my-1 flex items-center justify-center relative rounded-sm h-12 bg-blue-200">
         
                    <div key={user.id}>
                        <div className="flex flex-col text-center">
                            <b className="text-sm">{user.username}</b>
                            <p className="text-sm">Points: 100</p>
                        </div>
                        <img
                            src={user.avatar}
                            alt="player avatar"
                            className="w-10 hover:scale-150 absolute right-1 top-1 rounded-xl"
                        />
                    </div>
                    </div>
                ))}
          
        </>
    );
}
