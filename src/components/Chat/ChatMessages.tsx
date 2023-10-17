

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


// single message
interface MessageProps {
  message: { name: string; id: string; text: string };
}

function Message({ message }: MessageProps) {
  const isCurrentUser = message.name === localStorage.getItem("username");

  return (
    <p key={message.id}>
      {isCurrentUser ? 'You' : message.name }: {message.text}
    </p>
  );
}

export { MessageList };