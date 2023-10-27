import { createServer } from "http";
import express, { json } from "express";
import cors from "cors";
import { Server } from "socket.io";
import GameModel from "./models/GameModel";
import { Player } from "./models/PlayerModel";
import { TurnManager } from "./utils/TurnManager";

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
const turnManager = new TurnManager(gameModel, io);

// send list of online users to frontend
function sendPlayerListToClient(roomName: string) {
    const playersInRoom = gameModel.getAllPlayersInRoom(roomName);

    io.emit("onlineUsers", playersInRoom);
}



io.on("connection", (socket) => {
    // creating object of socket users to be able to retrieve them on disconnect
    interface UserSocketMap {
        [socketId: string]: Player;
    }
    const userSocketMap: UserSocketMap = {};

    // message response template
    function sendMessageResponse(user: Player, text: string, color: string) {
        socket.broadcast.emit("messageResponse", {
            text: text,
            color: color,
            id: `${socket.id}${Math.random()}`,
            language: user.language,
            name: "",
        });
    }

    // ON NEW USER
    socket.on("newUser", (user) => {
        if (user) {
            userSocketMap[socket.id] = user;
            const roomName = user.language;
            console.log(`user ${user.username} connected`);

            gameModel.addPlayerToRoom(roomName, user);

            sendMessageResponse(user, `${user.username} has joined the game`, "text-green-800");
            sendPlayerListToClient(roomName);

            if (gameModel.getPlayersInRoom(roomName).length === 1) {
                turnManager.startGame(roomName);
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

            sendMessageResponse(user, `${user.username} has left the game`, "text-red-800");

            const roomData = gameModel.getRoomData(roomName);

            if (roomData) {
                // Check if the disconnected user was the one with the current turn
                const currentTurn = roomData.getCurrentTurn();
                const currentPlayer = roomData.getPlayers()[currentTurn];

                // if it was current user's turn then end their turn
                if (currentPlayer.id === user.id) {
                    turnManager.endTurn(roomName);
                }
            }

            gameModel.removePlayerFromRoom(roomName, user.id);
            sendPlayerListToClient(roomName);
        }
    });
});

server.listen(5172, () => {
    console.log("SERVER RUNNING");
});
