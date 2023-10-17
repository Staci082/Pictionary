import { useState, useEffect } from "react";
import { SocketProp } from "../../context/SocketProp";

function Chat({ socket }: SocketProp) {
    const [message, setMessage] = useState<string>("");
    const [chatHistory, setChatHistory] = useState<{ name: string; id: string; text: string }[]>([]);

const sendMessage = () => {
    if (message.trim() === "") {
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
            <div className="w-[96%] h-[85%] flex flex-col justify-end overflow-auto hover:overflow-y-scroll px-1 absolute top-[8px] right-0 left-0 m-auto bg-white rounded-md">
                {chatHistory.map((message, index) =>
                    message.name === localStorage.getItem("username") ? (
                        <p key={index}>You: {message.text}</p>
                    ) : (
                        <p key={index}>
                            {message.name}: {message.text}
                        </p>
                    )
                )}
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
                maxLength={20}
            />
            <button
                onClick={sendMessage}
                style={{
                    backgroundImage: `url("https://img.icons8.com/3d-fluency/94/rocket.png")`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                }}
                className="w-6 h-6 absolute bottom-3 right-3"
            ></button>
        </>
    );
}

export default Chat;
