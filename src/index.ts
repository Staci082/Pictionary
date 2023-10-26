import { createServer } from "http";
import express, { json } from "express";
import cors from "cors";
import { Server } from "socket.io";
import Database from "./utils/database/database";
import GameModel from "./models/GameModel";
import { forEach } from "lodash";


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

io.on("connection", (socket) => {


    socket.on("newUser", (data) => {
        const { user } = Database.addPlayer(data);

        if (user) {
            console.log(`user ${user.username} connected`);
            // socket.join(user.language);
            gameModel.addPlayerToRoom(user.language, user);

            socket.broadcast.emit("messageResponse", {
                text: `${user.username} has joined the game`,
                color: "text-green-800", 
                id: `${socket.id}${Math.random()}`,
                language: user.language,
                name: ""
            });

            
            // const players = Database.getPlayers(user.language);
            // // console.log(`${user.language} players: ` + JSON.stringify(players, null, 2)); 
        }
    });

    socket.on("message", (data) => {
        socket.broadcast.to(data.language).emit("messageResponse", data);
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

const emitOnlineUsers = () => {
    const allOnlineUsers = Database.getAllOnlineUsers();
    io.emit("onlineUsers", allOnlineUsers);
};

setInterval(emitOnlineUsers, 500);


server.listen(5172, () => {
    console.log("SERVER RUNNING");
});
