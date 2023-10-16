
import Homepage from "./pages/Homepage";
import Game from "./pages/Game";
import { Routes, Route } from "react-router-dom";


function App() {
    return (
        <div className="min-h-screen min-w-screen flex items-center justify-center bg-gradient-to-tr from-blue-900 to-violet-950">
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/game" element={<Game />} />
            </Routes>
        </div>
    );
}

export default App;
