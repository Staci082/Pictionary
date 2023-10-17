import { useState, useEffect } from "react";
import { SocketProp } from "../../context/SocketProp";
import ChatInput from "./ChatInput";
import MessageList from "./ChatMessages";

function Chat({ socket }: SocketProp) {
  const [message, setMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<{ name: string; id: string; text: string }[]>([]);

  const sendMessage = () => {
    if (message.trim() === "") {  // make 
      return;
    }

    const name = localStorage.getItem("username") || "Anonymous";
    const newMessage = {
      text: message,
      name,
      id: `${socket.id}${Math.random()}`,
    };

    setChatHistory([...chatHistory, newMessage]);
    socket.emit("message", newMessage);
    setMessage("");
  }

  useEffect(() => {
    socket.on("messageResponse", (data) => setChatHistory([...chatHistory, data]));
  }, [socket, chatHistory]);

  socket.on("received_message", (data) => {
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
