interface User {
    id: string;
    username: string;
    avatar: string;
    points: number;
}
declare const onlineUsers: User[];
declare const addUser: ({ id, username, avatar, points }: User) => {
    user?: User | undefined;
    error?: string | undefined;
};
declare const removeUser: (username: string) => User | undefined;
declare const getUser: (username: string) => User | null;
export { addUser, removeUser, getUser, onlineUsers };
