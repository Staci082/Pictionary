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
            console.log(`user ${user.username} connected`);
            socket.broadcast.emit("userJoined", {
                text: `${user.username} has joined the game`,
                color: 'text-green-600'
            });
        }
    });



    socket.on("message", (data) => {
        socket.broadcast.emit("messageResponse", data);
        console.log(onlineUsers);
        // const beep = getUser(data.id);   //  USER ID BEING FOUND BUT NOT IN GETUSER? TRY SOMETHING ELSE
        // if (!beep) {
        //     console.log(`User not found for ID: ${data.id}`);
        // }
    });

    socket.on("disconnect", (socket) => {
        const user = getUser(socket.id);
        if (user) {
            console.log(`${user.username} user disconnected`);
            removeUser(socket.id);
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
