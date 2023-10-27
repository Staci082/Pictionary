import { createServer } from "http";
import express, { json } from "express";
import cors from "cors";
import { Server } from "socket.io";
import GameModel from "./models/GameModel";
import { Player } from "./models/PlayerModel";
import { TurnManager } from './utils/TurnManager';

const app = express();
app.use(cors());
app.use(json());

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

const gameModel = new GameModel();
const turnManager = new TurnManager(gameModel);

// send list of online users to frontend
function sendPlayerListToClient(roomName: string) {
    const playersInRoom = gameModel.getAllPlayersInRoom(roomName);
    io.emit("onlineUsers", playersInRoom);
}

const phaseDuration = {
    wordSelection: 15 * 1000, // 15 seconds for word selection
    drawing: 3 * 60 * 1000, // 3 minutes for drawing
    wordDisplay: 5 * 1000, // 5 seconds for word display
};

io.on("connection", (socket) => {
    // creating object of socket users to be able to retrieve them on disconnect
    interface UserSocketMap {
        [socketId: string]: Player;
    }
    const userSocketMap: UserSocketMap = {};

    // ON NEW USER
    socket.on("newUser", (user) => {
        if (user) {
            const roomName = user.language;
            console.log(`user ${user.username} connected`);

            gameModel.addPlayerToRoom(roomName, user);
            userSocketMap[socket.id] = user;
            socket.broadcast.emit("messageResponse", {
                text: `${user.username} has joined the game`,
                color: "text-green-800",
                id: `${socket.id}${Math.random()}`,
                language: user.language,
                name: "",
            });
            sendPlayerListToClient(roomName);

            if (gameModel.getPlayersInRoom(roomName).length === 1) {
                turnManager.startTurn(roomName);
            }
        }
    });

    // MESSAGE SENT
    socket.on("message", (data) => {
        socket.broadcast.to(data.language).emit("messageResponse", data);

        const playersInRoom = gameModel.getAllPlayersInRoom(data.language);

        playersInRoom.forEach((player) => {
            console.log(player);
        });
    });

    // ON DISCONNECT
    socket.on("disconnect", () => {
        const user = userSocketMap[socket.id];
        if (user) {
            const roomName = user.language;
            console.log(`${user.username} disconnected`);

            socket.broadcast.emit("messageResponse", {
                text: `${user.username} has left the game`,
                color: "text-red-800",
                id: `${socket.id}${Math.random()}`,
                language: user.language,
                name: "",
            });
            const roomData = gameModel.getRoomData(roomName);

            if (roomData) {
                // Check if the disconnected user was the one with the current turn
                const currentTurn = roomData.getCurrentTurn();
                const currentPlayer = roomData.getPlayers()[currentTurn];
    
                if (currentPlayer.id === user.id) {
                    // End the current turn
                    turnManager.endTurn(roomName);
                }
                if (currentTurn < roomData.getPlayers().length) {
                    const nextPlayer = roomData.getPlayers()[currentTurn];
                }
            }

            gameModel.removePlayerFromRoom(roomName, user.id)

            
    }});
});

server.listen(5172, () => {
    console.log("SERVER RUNNING");
});
