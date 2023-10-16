// import { IoSend } from "react-icons/io5";
import io from "socket.io-client"
import { useState, useEffect } from "react";

const socket = io("http://localhost:5172")

function Chat() {
  const [message, setMessage] = useState<string>("")
  const [messageReceived, setMessageReceived] = useState<string>("")
    const sendMessage = () => {
      socket.emit("send_message", { message })
    }

    useEffect(() => {
      socket.on("received_message", (data) => {
        setMessageReceived(data.message)
      })
    }, [socket])

    return (
        <>
                <div className="w-[96%] h-[75%] absolute top-[8px] right-0 left-0 m-auto bg-white rounded-md">
                {messageReceived}
                </div>
                <label htmlFor="chatInput"></label>

                <input 
                type="text" 
                name="chatInput" 
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                placeholder="Type your guess here.." 
                className="w-[96%] absolute bottom-[8px] right-0 left-0 rounded-md outline-none p-2 m-auto h-8" />
        
            <button 
            onClick={sendMessage}
            className="w-5 h-5 bg-blue-500 absolute bottom-3 right-5"></button>
        
        </>
    );
}

export default Chat;
