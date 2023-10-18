
interface User {
    id: string;
    username: string;
    avatar: string;
    points: number;
}

const onlineUsers: User[] = [];


const addUser = ({ id, username, avatar, points }: User): { user?: User; error?: string }  => {
    const existingUser = onlineUsers.find((user) => {
        user.username === username;
    });

    if (existingUser) {
        return { error: "Username is already taken. Be faster next time." };
    }

    const user = { id, username, avatar, points };
    onlineUsers.push(user);
    return { user };
};

const removeUser = (username: string) => {
    const index = onlineUsers.findIndex((user) => user.username === username);

    if (index !== -1) {
        return onlineUsers.splice(index, 1)[0];
    }
};

// CHECK IF STILL NEEDED
const getUser = (username: string) => {
    const user = onlineUsers.find((user) => user.username === username);

    if (!user) {
        return null; 
    }
    console.log(onlineUsers)

    return user; 
};



export { addUser, removeUser, getUser, onlineUsers };