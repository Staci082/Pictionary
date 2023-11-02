import { createContext, useContext, useState, useEffect, ReactNode } from "react";
// import { SocketProp } from "../props/SocketProp";
import { Socket } from "socket.io-client";


export class Player {
    constructor(
        public id: string, 
        public username: string,
        public avatar: string,
        public points: number,
        public language: string
    ) {
        this.id = id
        this.username = username
        this.avatar = avatar
        this.points = points
        this.language = language
    }
}

type RoomData = {
    players: Player[];
    words: string[];
    currentWord: string;
    drawingPlayer: Player | null;
    turnPhase: "wordSelection" | "drawing" | "endTurn";
    currentTurn: number;
};

const RoomDataContext = createContext<{ roomData: RoomData; setRoomData: React.Dispatch<RoomData> } | undefined>(undefined);

export function RoomDataProvider({ children, socket }: { children: ReactNode, socket: Socket }) {

    const [roomData, setRoomData] = useState<RoomData>({ players: [], words: [], currentWord: "", drawingPlayer: null, turnPhase: "wordSelection", currentTurn: 0 });

    useEffect(() => {
        socket.on("roomData", (data: RoomData) => setRoomData(data));
    }, [socket, setRoomData]);

    return (
        <RoomDataContext.Provider value={{ roomData, setRoomData }}>
            {children}
        </RoomDataContext.Provider>
    );
}

export function useRoomData() {
    const context = useContext(RoomDataContext);
    if (context === undefined) {
        throw new Error("useRoomData must be used within a RoomDataProvider");
    }
    return context;
}
