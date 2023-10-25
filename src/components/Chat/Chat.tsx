import { useState, useEffect } from "react";
import { SocketProp } from "../../props/SocketProp";
import { useLanguage } from "../../context/LanguageContext";
import MessageList from "./ChatMessages";
import ChatInput from "./ChatInput";


function Chat({ socket }: SocketProp) {
    const [message, setMessage] = useState<string>("");
    const [chatHistory, setChatHistory] = useState<{ name: string; id: string; text: string; color: string; language: string }[]>([]);
    const { selectedLanguage } = useLanguage();

    const sendMessage = () => {
        // Don't send empty messages
        if (message.trim() === "") {
            return;
        }

        const name = localStorage.getItem("username") || "Anonymous";
        const newMessage = {
            text: message,
            name,
            id: `${socket.id}${Math.random()}`,
            color: "black",
            language: selectedLanguage, 
        };

        setChatHistory([...chatHistory, newMessage]);
        socket.emit("message", newMessage);
        setMessage("");
    };

    useEffect(() => {
        socket.on("messageResponse", (data) => setChatHistory([...chatHistory, data]));
    }, [socket, chatHistory]);

    // Filter messages based on the selected language
    const filteredMessages = chatHistory.filter((message) => message.language === selectedLanguage);

    return (
        <>
            <MessageList chatHistory={filteredMessages} />
            <ChatInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </>
    );
}

export default Chat;
