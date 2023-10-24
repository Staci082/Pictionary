interface User {
    id: string;
    username: string;
    avatar: string;
    points: number;
    language: string;
}

const onlineUsers: User[] = [];

const addUser = ({ id, username, avatar, points, language }: User) => {
    const existingUser = onlineUsers.find((user) => user.username === username);

    if (existingUser) {
        return { error: "Username is already taken. Be faster next time." };
    }

    const user: User = { id, username, avatar, points, language };
    onlineUsers.push(user);
    return { user };
};

const removeUser = (id: string) => {
    const index = onlineUsers.findIndex((user) => user.id === id);

    if (index !== -1) {
        return onlineUsers.splice(index, 1)[0];
    }
};

const getUser = (id: string) => {
    const user = onlineUsers.find((user) => user.id === id);

    if (!user) {
        return null; // Return null if user not found
    }

    return user; // Return the user directly
};

export { addUser, removeUser, getUser, onlineUsers };
