// message list
interface MessageListProps {
  chatHistory: { name: string; id: string; text: string; color: string }[];
}

function MessageList({ chatHistory }: MessageListProps) {
  return (
    <div 
    data-te-perfect-scrollbar-init="true"
    className="w-[96%] h-[85%] flex flex-col justify-end overflow-auto hover:overflow-y-scroll absolute top-[8px] right-0 left-0 m-auto bg-white rounded-md">
      <div className="max-h-[85%] min-h">
      {chatHistory.map((message, id) => (
        <Message key={id} message={message} isEven={id % 2 === 0} />
      ))}
</div>
    </div>
  );
}

// single message
interface MessageProps {
  message: { name: string; id: string; text: string; color: string };
  isEven: boolean;
}

function Message({ message, isEven }: MessageProps) {
  const isCurrentUser = message.name === localStorage.getItem("username");
  const messageClass = isEven ? 'px-1' : 'bg-blue-100 px-1';
  const displayName = isCurrentUser ? 'You' : message.name;
  return (
<p key={message.id} className={`${messageClass}  ${message.color}`}> {/* keep double space in-between or else color doesn't work */}

      {/* checking if message is user sent or server message */}
      {displayName ? `${displayName}: ${message.text}` : message.text}
    </p>
  );
}

export default MessageList;