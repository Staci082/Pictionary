import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider  } from "./context/LanguageContext";
import { GameProvider } from "./context/GameContext"
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <GameProvider>
        <BrowserRouter>
        <LanguageProvider>
            <App />
            </LanguageProvider>
        </BrowserRouter>
        </GameProvider>
    </React.StrictMode>
);
