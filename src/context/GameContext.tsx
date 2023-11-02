// GameContext.js
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { socket } from "../props/Socket";

export interface User {
    username: string;
    avatar: string;
    id: string;
    points: number;
    language: string;
}

type GameProviderProps = {
    children: ReactNode;
};

const initialContextValue = {
    currentTurn: "",
    players: [] as User[]
};

const GameContext = createContext(initialContextValue);

export function useGame() {
    return useContext(GameContext);
}

export function GameProvider({ children }: GameProviderProps) {
    const [currentTurn, setCurrentTurn] = useState("");
    const [players, setPlayers] = useState<User[]>([]);

    useEffect(() => {
        socket.on("currentPlayer", (userId) => {
            setCurrentTurn(userId);
        });

        socket.on("playersInRoom", (users: User[]) => {
            setPlayers(users);
            // set current turn by default to the first player in room
            if (currentTurn === "" && users.length > 0) {
                setCurrentTurn(users[0].id);
            }
        });
    }, [socket]);

    return <GameContext.Provider value={{ currentTurn, players }}>{children}</GameContext.Provider>;
}
