import io from "socket.io-client";
import { useState } from "react";

const socket = io("http://localhost:5172");

function Chat() {
  const [message, setMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<string[]>([]);

  const sendMessage = () => {
    if (message.trim() === "") {
      // Don't send empty messages
      return;
    }

    // Append your message to the chat history
    setChatHistory([...chatHistory, "You: " + message]);

    // Emit the message to the server
    socket.emit("send_message", { message });

    // Clear the input field
    setMessage("");
  };

  socket.on("received_message", (data) => {
    // Append the received message to the chat history
    setChatHistory([...chatHistory, `Stranger: ${data.message}`]);
  });

  return (
    <>
      <div className="w-[96%] h-[75%] absolute top-[8px] right-0 left-0 m-auto bg-white rounded-md">
        {chatHistory.map((chat, index) => (
          <div key={index}>{chat}</div>
        ))}
      </div>
      <input
        type="text"
        name="chatInput"
        placeholder="Type your guess here.."
        className="w-[96%] absolute bottom-[8px] right-0 left-0 rounded-md outline-none p-2 m-auto h-8"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
      />
      <button 
      onClick={sendMessage}
      className="w-5 h-5 bg-blue-500 absolute bottom-3 right-5"></button>
    </>
  );
}

export default Chat;
