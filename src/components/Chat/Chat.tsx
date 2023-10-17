import { useState, useEffect } from "react";
import { SocketProp } from "../../context/SocketProp";
import ChatInput from "./ChatInput";
import { MessageList } from "./ChatMessages";
function Chat({ socket }: SocketProp) {
    const [message, setMessage] = useState<string>("");
    const [chatHistory, setChatHistory] = useState<{ name: string; id: string; text: string}[]>([]);

    const sendMessage = () => {
        if (message.trim() === "") {
            // make sure input isn't empty
            return;
        }

        const name = localStorage.getItem("username") || "Anonymous";
        const newMessage = {
            text: message,
            name,
            id: `${socket.id}${Math.random()}`,
            type: "message"
        };

        setChatHistory([...chatHistory, newMessage]);
        socket.emit("message", newMessage);
        setMessage("");
    };

    useEffect(() => {
        socket.on("messageResponse", (data) => {
            setChatHistory([...chatHistory, { ...data }]);
        });
        socket.on("userJoined", (data) => {
            setChatHistory([...chatHistory, { ...data}]);
        });
        socket.on("userLeft", (data) => {
            setChatHistory([...chatHistory, { ...data}]);
            console.log(chatHistory)
        });
    }, [socket, chatHistory]);

    socket.on("messageResponse", (data) => {
        setChatHistory([...chatHistory, data.message]);
    });

    return (
        <>
            <MessageList chatHistory={chatHistory} />
            <ChatInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </>
    );
}

export default Chat;