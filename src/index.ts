import { createServer } from "http";
import express, { json } from "express";
import cors from "cors";
import { Server } from "socket.io";
import Database from "./utils/database/database";
import GameModel from "./models/GameModel";

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

function sendPlayerListToClient(roomName: string) {
    const playersInRoom = gameModel.getAllPlayersInRoom(roomName);
    io.emit("onlineUsers", playersInRoom);
}

io.on("connection", (socket) => {


    socket.on("newUser", (user) => {
       
        if (user) {
            console.log(`user ${user.username} connected`);

            gameModel.addPlayerToRoom(user.language, user);

            socket.broadcast.emit("messageResponse", {
                text: `${user.username} has joined the game`,
                color: "text-green-800", 
                id: `${socket.id}${Math.random()}`,
                language: user.language,
                name: ""
            });

            sendPlayerListToClient(user.language);
        }
    });

    socket.on("message", (data) => {
        socket.broadcast.to(data.language).emit("messageResponse", data);
        
        const playersInRoom = gameModel.getAllPlayersInRoom(data.language);

        playersInRoom.forEach((player) => {
            console.log(player)
        });
    });

    socket.on("disconnect", () => {
        const user = Database.findPlayerById(socket.id)
        console.log(user)
        if (user) {
            console.log(`${user.username} disconnected`);

            socket.broadcast.emit("messageResponse", {
                text: `${user.username} has left the game`,
                color: "text-red-800", 
                id: `${socket.id}${Math.random()}`,
                language: user.language,
                name: ""
            });

            // Remove the user from the room but keep them in the online users list
            socket.leave(user.language);
            Database.removePlayer(user.language, user.id);
        }
    });
});



// const emitOnlineUsers = () => {
//     const allOnlineUsers = Database.getAllOnlineUsers();
//     io.emit("onlineUsers", allOnlineUsers);
// };

// setInterval(emitOnlineUsers, 500);


server.listen(5172, () => {
    console.log("SERVER RUNNING");
});
