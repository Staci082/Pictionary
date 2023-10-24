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
    socket.on("newUser", ({ username, avatar, socketID, language }) => {
        const { error, user } = addUser({ id: socketID, username, avatar, points: 0, language });

        if (error) {
            console.log(error);
        } else if (user) {
            console.log(`user ${user.username} connected`);

            // Join the room associated with the selected language
            socket.join(language);

            socket.broadcast.to(language).emit("userJoined", {
                text: `${user.username} has joined the game in the ${language} room`,
                color: "text-green-600",
            });
        }
    });

    socket.on("message", (data) => {
        // Send the message to the room associated with the selected room (language)
        socket.broadcast.to(data.language).emit("messageResponse", data);
    });

    socket.on("disconnect", () => {
        const user = getUser(socket.id);
        if (user) {
            console.log(`${user.username} user disconnected`);
            removeUser(socket.id);
            // Make the user leave the language room
            socket.leave(user.language);
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
