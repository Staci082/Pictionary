// GameContext.js
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { socket } from "../props/Socket"

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
    currentTurn: null,
    players: [] as User[], // An empty array to match the players structure 
 };


  const GameContext = createContext(initialContextValue);

export function useGame() {
    return useContext(GameContext);
}


export function GameProvider({ children }: GameProviderProps) {
    const [currentTurn, setCurrentTurn] = useState(null);
    const [players, setPlayers] = useState<User[]>([]);


    useEffect(() => {
        socket.on("currentPlayer", (newTurn) => {
            setCurrentTurn(newTurn);
        });

        socket.on("playersInRoom", (users: User[]) => {
            setPlayers(users);
        });

    }, [socket]);

    return <GameContext.Provider value={{ currentTurn, players }}>{children}</GameContext.Provider>;
}
