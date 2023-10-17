const http = require("http");
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const { addUser, removeUser, getUser } = require("./users");

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
        const { error, user } = addUser({ id: socketID, avatar, username });
        if (error) {
            console.log(error);
        } else {
            console.log("new user:", user);
            socket.broadcast.emit("userJoined", {
              text: `${user.username} has joined the game`,
              type: "user", 
            });
        }
    });

    socket.on("message", (data) => {
        socket.broadcast.emit("messageResponse",  {
          text: data,
          type: "message"
        });
    });
    socket.on("disconnect", () => {
      const user = getUser(socket.id); 

      if (user) {
        console.log("user left:", user);
          socket.broadcast.emit("userLeft", {
              text: `${user.username} has left the game`,
              type: "user", 
          });
          removeUser(socket.id);
      }
  });
});

server.listen(5172, () => {
    console.log("SERVER RUNNING");
});