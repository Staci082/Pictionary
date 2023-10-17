const http = require("http");
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const { addUser, removeUser, getUser, onlineUsers } = require("./users");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    socket.on("newUser", ({ username, avatar, socketID }) => {
        const { error, user } = addUser({ id: socketID, username, avatar });

        if (error) {
            console.log(error);
        } else {
            console.log("new user:", user);
            socket.broadcast.emit("userJoined", {
                text: `${user.username} has joined the game`,
            });
        }
    });


    socket.on("message", (data) => {
        socket.broadcast.emit("messageResponse", data);
        console.log(onlineUsers);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
        removeUser(socket.id);
    });
});
const emitOnlineUsers = () => {
    io.emit("onlineUsers", onlineUsers);
};


setInterval(emitOnlineUsers, 1000);
server.listen(5172, () => {
    console.log("SERVER RUNNING");
});
