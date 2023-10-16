
const http = require("http");
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});


  io.on('connection', (socket) => {
        console.log("user connected:", socket.id)

        socket.on("send_message", (data) => {
          console.log(data)
          socket.broadcast.emit("received_message", data)
        })

        socket.on("disconnect", () => {
          console.log("user disconnected:", socket.id)
        })
    });









server.listen(5172, () => {
  console.log("SERVER RUNNING");
});