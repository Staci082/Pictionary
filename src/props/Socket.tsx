import { Socket } from "socket.io-client";
import io from "socket.io-client";


export const socket = io("http://localhost:5172");

export type SocketProp = {
socket: Socket;
};  

