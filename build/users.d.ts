interface User {
    id: string;
    username: string;
    avatar: string;
    points: number;
}
declare const onlineUsers: User[];
declare const addUser: ({ id, username, avatar, points }: User) => {
    error: string;
    user?: undefined;
} | {
    user: User;
    error?: undefined;
};
declare const removeUser: (id: string) => User | undefined;
declare const getUser: (id: string) => User | null;
export { addUser, removeUser, getUser, onlineUsers };
