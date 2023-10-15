import { useState } from "react";
import AvatarSlider from "../components/AvatarSlider";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

// GETTING PREVIOUS COOKIE DATA INSTEAD OF CURRENT --FIX
function Homepage() {
    const navigate = useNavigate();
    const [cookies, setCookies] = useCookies(["username", "avatar"]);
    const [username, setUsername] = useState("");
    const [selectedAvatar, setSelectedAvatar] = useState<string>("/face1.avif");

    const handleAvatarSelection = (selected: string) => {
        setSelectedAvatar(selected);
    };

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setCookies("username", username);
        setCookies("avatar", selectedAvatar);
        console.log(cookies);
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
}

export default Homepage;
