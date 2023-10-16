
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
const onlineUsers = new Map(); 

app.get('/onlineUsers', (req, res) => {
  res.json(Array.from(onlineUsers.values())); // Convert the map to an array and send it as JSON
});


  io.on('connection', (socket) => {
    // Add the user to the list of online users
    
  console.log(`User Connected: ${socket.username}`);
    socket.on('addUser', (data) => {
      const { username, avatar } = data;
      socket.username = username;
      onlineUsers.set(socket.id, { username, avatar });
    });
  
    // Remove the user from the list of online users when they disconnect
    socket.on('disconnect', () => {
      onlineUsers.delete(socket.id);
      console.log("User Disconnected", socket.username);
    });
  });







server.listen(5172, () => {
  console.log("SERVER RUNNING");
});