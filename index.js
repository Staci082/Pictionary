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

  socket.on('message', (data) => {
    socket.broadcast.emit('messageResponse', data);
  });



  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');

    socket.disconnect();
  });
});


server.listen(5172, () => {
    console.log("SERVER RUNNING");
});
