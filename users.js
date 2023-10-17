const onlineUsers = [];


const addUser = ({ id, username, avatar }) => {
    const existingUser = onlineUsers.find((user) => {
        user.username === username;
    });

    if (existingUser) {
        return { error: "Username is already taken. Be faster next time." };
    }

    const user = { id, username, avatar };
    onlineUsers.push(user);
    return { user };
};

const removeUser = (id) => {
    const index = onlineUsers.findIndex((user) => user.id === id);

    if (index !== -1) {
        return onlineUsers.splice(index, 1)[0];
    }
};

// CHECK IF STILL NEEDED
const getUser = (id) => {
    const user = onlineUsers.find((user) => user.id === id);

    if (!user) {
        return null; // Return null if user not found
    }

    return user; // Return the user directly
};


module.exports = { addUser, removeUser, getUser, onlineUsers}