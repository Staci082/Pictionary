
import Homepage from "./pages/Homepage";
import Game from "./pages/Game";
import Error from "./pages/Error";
import { Routes, Route } from "react-router-dom";
import { socket } from "./props/Socket"


function App() {
    return (
        <div className="min-h-screen min-w-screen flex items-center justify-center bg-gradient-to-tr from-blue-900 to-violet-950">
            <Routes>
                <Route path="/" element={<Homepage socket={socket}/>} />
                <Route path="/game" element={<Game socket={socket}/>} />
                <Route element={<Error/>} />
            </Routes>
        </div>
    );
}

export default App;
