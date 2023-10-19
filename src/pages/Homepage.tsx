import React, { useState } from "react";
import AvatarSlider from "../components/AvatarSlider";
import { useNavigate } from "react-router-dom";
import { SocketProp } from "../context/SocketProp";
import StarsAnimation from "../components/StarsAnimation";

function Homepage({ socket }: SocketProp) {
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

        socket.emit("newUser", { username, avatar: selectedAvatar, socketID: socket.id });
        navigate("/game");
    };

    
    const inputLanguages: string[] = ["English", "Français", "Nederlands", "Español", "Românesc"];
    return (
        <>
            <div className="overflow-hidden h-screen w-screen relative flex justify-center items-center">
                <form className="flex flex-col items-center gap-8 text-xl">
                    <select name="language" id="language" className="outline-none w-[300px] z-10 bg-indigo-700 border-solid border-white border-2  rounded-xl p-2 text-center text-white">
                        {inputLanguages.map((language) => (
                            <option value={language}>{language}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter your name.."
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onInvalid={(e) => {
                            e.preventDefault();
                            // Display a custom error message or set a state to show an error message
                        }}
                        className="bg-indigo-700 enabled:hover:bg-indigo-700 z-10 p-2 w-[300px] border-solid border-white border-2 rounded-xl outline-none text-white text-center"
                        required
                    />

                    <AvatarSlider onAvatarSelect={handleAvatarSelection} />

                    <button onClick={handleSubmit} className="w-[300px] z-10 bg-violet-600 p-2 border-solid border-white border-2 rounded-xl text-white shadow-xl shadow-indigo-950/50 hover:translate-y-1 hover:bg-indigo-700">
                        PLAY!
                    </button>
                </form>
                <StarsAnimation />
            </div>
        </>
    );
}

export default Homepage;
