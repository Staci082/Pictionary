import { createServer } from "http";
import express, { json } from "express";
import cors from "cors";
import { Server } from "socket.io";
import GameModel from "./models/GameModel";
import { Player } from "./models/PlayerModel";

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
            console.log(`user ${user.username} connected`);

            gameModel.addPlayerToRoom(user.language, user);
            userSocketMap[socket.id] = user;
            socket.broadcast.emit("messageResponse", {
                text: `${user.username} has joined the game`,
                color: "text-green-800",
                id: `${socket.id}${Math.random()}`,
                language: user.language,
                name: "",
            });
            sendPlayerListToClient(user.language);

            if (gameModel.getPlayersInRoom(user.language).length === 1) {
                // Start the turn-based game when the first player joins
                console.log("Starting turn-based game.");
                startTurn(user.language);
            }
        }
    });

    
    function startTurn(roomName: string) {
        const roomData = gameModel.getRoomData(roomName);
        if (roomData) {
            const playersInRoom = roomData.getPlayers();
            const currentTurn = roomData.getCurrentTurn();

            console.log(`It's ${playersInRoom[currentTurn].username}'s turn.`);

            // Implement your turn logic here
            // Set the turnPhase to "wordSelection", "drawing", etc.
            // Implement timers for each phase
            // Notify players about their turn, and when the turn ends, increment the turn
        }
    }

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
            console.log(`${user.username} disconnected`);

            socket.broadcast.emit("messageResponse", {
                text: `${user.username} has left the game`,
                color: "text-red-800",
                id: `${socket.id}${Math.random()}`,
                language: user.language,
                name: "",
            });
            const roomName = user.language;
            const roomData = gameModel.getRoomData(roomName);
    
            if (roomData) {
                // Remove the player from the room
                gameModel.removePlayerFromRoom(roomName, user.id);
                const currentTurn = roomData.getCurrentTurn();
    
                if (currentTurn < roomData.getPlayers().length) {
                    // Increment the turn
                    roomData.incrementTurn();
    
                    // Get the next player in turn
                    const nextPlayer = roomData.getPlayers()[currentTurn];
    
                    // Implement your logic to notify the next player that it's their turn
                    // For example, you can emit a "nextTurn" event to the next player's socket.
                    // You can use `io.to(nextPlayer.id).emit("nextTurn", yourData)` to notify the next player.
    
                    console.log(`It's now ${nextPlayer.username}'s turn.`);
                }
        }
    }});
});

server.listen(5172, () => {
    console.log("SERVER RUNNING");
});
