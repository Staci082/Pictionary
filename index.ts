import { createServer } from "http";
import express, { json } from "express";
import cors from "cors";
import { Server } from "socket.io";
import { addUser, removeUser, getUser, onlineUsers } from "./src/users";
import { JSONPreset } from 'lowdb/node'
import * as wordsData from "./src/database/words.json"

type Data = {
    [language: string]: {
        players: {
            id: string;
            username: string;
            avatar: string;
            points: number;
        }[];
        words: string[];
        usedWords: string[];
    };
};



const defaultData: Data = {
    'English': {
      players: [],
      words: wordsData.English || [],
      usedWords: [],
    },
    'French': {
      players: [],
      words: wordsData.French || [],
      usedWords: [],
    },
    'Dutch': {
      players: [],
      words: wordsData.Dutch || [],
      usedWords: [],
    },
    'Spanish': {
      players: [],
      words: wordsData.Spanish || [],
      usedWords: [],
    },
    'Romanian': {
      players: [],
      words: wordsData.Romanian || [],
      usedWords: [],
    },
  };

const db = await JSONPreset('db.json', defaultData)
db.data.English.players.push({
    id: "player1",
    username: "John",
    avatar: "avatar1",
    points: 100,
  });
  
  // If you don't want to type db.data every time, you can use destructuring assignment
  const { English, French, Dutch, Spanish, Romanian } = db.data;
  English.players.push({
    id: "player2",
    username: "Jane",
    avatar: "avatar2",
    points: 150,
  });
  
  // Writing the updated db.data content to the file
  await db.write();

const app = express();
app.use(cors());
app.use(json());

const server = createServer(app);

// app.get("/english", (req: any, res: any) => {
//     const data = db.get("EnglishRoom").value();
//     return res.json(data);
// });

// socket connections

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

// io.on("connection", (socket) => {
//     socket.on("newUser", ({ username, avatar, socketID }) => {
//         const { error, user } = addUser({ id: socketID, username, avatar, points: 0 });

//         if (error) {
//             console.log(error);
//         } else if (user) {
//             console.log(`user ${user.username} connected`);
//             socket.broadcast.emit("userJoined", {
//                 text: `${user.username} has joined the game`,
//                 color: "text-green-600",
//             });
//         }
//     });

//     socket.on("message", (data) => {
//         socket.broadcast.emit("messageResponse", data);
//         console.log(onlineUsers);

//         const beep = getUser(data.username);

//         console.log(`getUser output: ${beep}`);
//     });

//     socket.on("disconnect", () => {
//         const user = getUser(socket.id); 
//         if (user) {
//             console.log(`${user.username} user disconnected`);
//         }
//     });
// });
const emitOnlineUsers = () => {
    io.emit("onlineUsers", onlineUsers);
};

setInterval(emitOnlineUsers, 1000);
server.listen(5172, () => {
    console.log("SERVER RUNNING");
});
function JSONFile<T>(arg0: string) {
    throw new Error("Function not implemented.");
}

