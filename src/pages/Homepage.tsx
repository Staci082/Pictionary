import React,{ useEffect, useState } from "react";
import AvatarSlider from "../components/AvatarSlider";
import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client"; // Import 'io' and 'Socket' from 'socket.io-client'

// Define the type for your socket and events if needed
type SocketType = Socket<{
    addUser: (data: { username: string; avatar: string }) => void;
}>;



const Homepage = () => {
    const navigate = useNavigate();
    const [socket, setSocket] = useState<SocketType | null>(null); // Specify the type for the socket
    const [username, setUsername] = useState("");
    const [selectedAvatar, setSelectedAvatar] = useState<string>("/face1.avif");

    const handleAvatarSelection = (selected: string) => {
        setSelectedAvatar(selected);
    };

    useEffect(() => {
        // Initialize the socket connection when the component mounts
        const socket = io("http://localhost:5172"); // Replace with your server URL
        setSocket(socket);
     
      
    }, []);

    // Add your username and avatar to the server using the socket connection
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Check if the socket connection is available
        if (socket) {
            // Emit the "addUser" event with username and selectedAvatar
            socket.emit('addUser', { username, avatar: selectedAvatar });
          }

      
        localStorage.setItem("username", username);
        localStorage.setItem("avatar", selectedAvatar);
        navigate("/game");
    };


    return (
        <form className="flex flex-col items-center gap-8">
            <input
                type="text"
                name="username"
                placeholder="Enter your name.."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-transparent p-2 w-[300px] border-solid border-white border-2 rounded-xl outline-none text-white text-center"
                required
            />

            <AvatarSlider onAvatarSelect={handleAvatarSelection} />

            <button
                onClick={handleSubmit}
                className="w-[300px] bg-violet-700 p-2 rounded-xl w-[300] text-white font-bold shadow-xl shadow-indigo-950/50 hover:translate-y-1 hover:bg-indigo-600"
            >
                PLAY!
            </button>
        </form>
    );
};

export default Homepage;
