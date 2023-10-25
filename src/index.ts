import { createServer } from "http";
import express, { json } from "express";
import cors from "cors";
import { Server } from "socket.io";
import { User, addUser, removeUser} from "./users";


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


export const onlineUsers: User[] = [];

io.on("connection", (socket) => {


    socket.on("newUser", (data) => {
        const { user } = addUser(data);

        if (user) {
            console.log(`user ${user.username} connected`);

            socket.join(user.language);

            socket.broadcast.emit("messageResponse", {
                text: `${user.username} has joined the game`,
                color: "text-green-800", 
                id: `${socket.id}${Math.random()}`,
                language: user.language,
                name: ""
            });

            onlineUsers.push(user);
        }
    });

    socket.on("message", (data) => {
        socket.broadcast.to(data.language).emit("messageResponse", data);
    });

    socket.on("disconnect", () => {
        const user = onlineUsers.find((user) => user.id === socket.id);
        if (user) {
            console.log(`${user.username} disconnected`);
            socket.broadcast.emit("messageResponse", {
                text: `${user.username} has left the game`,
                color: "text-red-800", 
                id: `${socket.id}${Math.random()}`,
                language: user.language,
                name: ""
            });
            removeUser(user.username);
            console.log(onlineUsers)
            // Remove the user from the room but keep them in the online users list
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
