

// message list
interface MessageListProps {
  chatHistory: { name: string; id: string; text: string }[];
}

function MessageList({ chatHistory }: MessageListProps) {
  return (
    <div className="w-[96%] h-[85%] flex flex-col justify-end overflow-auto hover:overflow-y-scroll px-1 absolute top-[8px] right-0 left-0 m-auto bg-white rounded-md">
      {chatHistory.map((message, id) => (
        <Message key={id} message={message} />
      ))}
    </div>
  );
}


// Message component
interface MessageProps {
  message: { name: string; id: string; text: string; type?: "user" | "message" };
}

function Message({ message }: MessageProps) {
  const isCurrentUser = message.name === localStorage.getItem("username");

  let textColor = "black";
  let textPrefix = "";

  if (message.type === "user") {
    textColor = "green"; 
    textPrefix = ""
  } else {
    if (!isCurrentUser) {
      textColor = "red";
    }

    textPrefix = isCurrentUser ? "You:" : `${message.name}:`;
  }

  return (
    <p key={message.id} style={{ color: textColor }}>
      {textPrefix} {message.text}
    </p>
  );
}

export { MessageList };