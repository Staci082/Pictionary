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
    currentTurn: "",
    players: [] as User[], // An empty array to match the players structure 
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
            if (currentTurn === "" && users.length > 0) {
              // Set currentTurn to the user ID of the first player if not already set
              setCurrentTurn(users[0].id);
            }
          });

    }, [socket]);

    return <GameContext.Provider value={{ currentTurn, players }}>{children}</GameContext.Provider>;
}
