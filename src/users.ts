
import { onlineUsers } from "./index";

export type User = {
    id: string;
    username: string;
    avatar: string;
    points: number;
    language: string;
}



const addUser = ({ id, username, avatar, points, language }: User) => {
    const existingUser = onlineUsers.find((user) => user.username === username);

    if (existingUser) {
        return { error: "Username is already taken." };
    }
    const user: User = { id, username, avatar, points, language };
    return { user };
};

const removeUser = (username: string) => {
    const index = onlineUsers.findIndex((user) => user.username === username);

    if (index !== -1) {
        return onlineUsers.splice(index, 1)[0];
    }
};



export { addUser, removeUser };
