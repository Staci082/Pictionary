interface ChatInputProps {
    message: string;
    setMessage: (message: string) => void;
    sendMessage: () => void;
}

function ChatInput({ message, setMessage, sendMessage }: ChatInputProps) {
    return (
        <div>
            <input
                type="text"
                name="chatInput"
                placeholder="Type your guess here.."
                className="w-[96%] absolute bottom-[8px] right-0 left-0 rounded-md outline-none text-xs sm:text-sm ms:text-md p-2 m-auto h-8"
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
        </div>
    );
}

export default ChatInput;