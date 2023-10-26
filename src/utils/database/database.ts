import wordsData from "../words/words.json";

export type User = {
    id: string;
    username: string;
    avatar: string;
    points: number;
    language: string;
};

type Data = {
    room: string;
    players: User[];
    words: string[];
    usedWords: string[];
};

const database: Data[] = [
    {
        room: "English",
        players: [],
        words: wordsData.English,
        usedWords: [],
    },
    {
        room: "Français",
        players: [],
        words: wordsData.French,
        usedWords: [],
    },
    {
        room: "Nederlands",
        players: [],
        words: wordsData.Dutch,
        usedWords: [],
    },
    {
        room: "Español",
        players: [],
        words: wordsData.Spanish,
        usedWords: [],
    },
    {
        room: "Română",
        players: [],
        words: wordsData.Romanian,
        usedWords: [],
    },
];

class Database {
    static getAllOnlineUsers(): User[] {
        const onlineUsers: User[] = [];
        for (const room of database) {
            onlineUsers.push(...room.players);
        }
        return onlineUsers;
    }

    static addPlayer(user: User) {
        const room = database.find((room) => room.room === user.language);
        if (room) {
            room.players.push(user);
            return { user };
        } else {
            console.error(`Invalid language: ${user.language}`);
            return { user: null };
        }
    }

    static getPlayers(language: string) {
        const room = database.find((room) => room.room === language);
        return room ? room.players : [];
    }

    static findPlayerById(playerId: string): User | null {
        for (const room of database) {
            const player = room.players.find((p) => p.id === playerId);
            if (player) {
                return player;
            }
        }
        return null;
    }

    static removePlayer(language: string, playerId: string) {
        const room = database.find((room) => room.room === language);
        if (room) {
            const index = room.players.findIndex((p) => p.id === playerId);
            if (index !== -1) {
                room.players.splice(index, 1);
            } else {
                console.error(`Player not found with id: ${playerId}`);
            }
        } else {
            console.error(`Invalid language: ${language}`);
        }
    }
}

export default Database;
