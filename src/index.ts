import { createServer } from "http";
import express, { json } from "express";
import cors from "cors";
import { Server } from "socket.io";
import { addUser, removeUser, getUser, onlineUsers } from "./users";

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

io.on("connection", (socket) => {
    socket.on("newUser", ({ username, avatar, socketID }) => {
        const { error, user } = addUser({ id: socketID, username, avatar, points: 0 });

        if (error) {
            console.log(error);
        } else if (user) {
            console.log(`user ${user.username} connected`);
            socket.broadcast.emit("userJoined", {
                text: `${user.username} has joined the game`,
                color: "text-green-600",
            });
        }
    });

    socket.on("message", (data) => {
        socket.broadcast.emit("messageResponse", data);
        console.log(onlineUsers);

        const beep = getUser(data.username);

        console.log(`getUser output: ${beep}`);
    });

    socket.on("disconnect", () => {
        const user = getUser(socket.id); 
        if (user) {
            console.log(`${user.username} user disconnected`);
            removeUser(socket.id)
        }
    });
});
const emitOnlineUsers = () => {
    io.emit("onlineUsers", onlineUsers);
};

setInterval(emitOnlineUsers, 1000);
server.listen(5172, () => {
    console.log("SERVER RUNNING");
});


