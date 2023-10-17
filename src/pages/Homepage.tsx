import React,{ useState } from "react";
import AvatarSlider from "../components/AvatarSlider";
import { useNavigate } from "react-router-dom";
import { SocketProp } from "../context/SocketProp";


function Homepage ({ socket }: SocketProp) {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [selectedAvatar, setSelectedAvatar] = useState<string>("/face1.avif");

    const handleAvatarSelection = (selected: string) => {
        setSelectedAvatar(selected);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem("username", username);
        localStorage.setItem("avatar", selectedAvatar);

        socket.emit('newUser', {  selectedAvatar, username, socketID: socket.id });
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
                className="w-[300px] bg-violet-700 p-2 rounded-xl text-white font-bold shadow-xl shadow-indigo-950/50 hover:translate-y-1 hover:bg-indigo-600"
            >
                PLAY!
            </button>
        </form>
    );
};

export default Homepage;