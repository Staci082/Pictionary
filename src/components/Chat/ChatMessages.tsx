import Translations from "../../translations/translations";
import { useLanguage } from "../../context/LanguageContext";


type ChatHistoryProps = {
    chatHistory: { name: string; id: string; text: string; color: string }[];
}
// message list
function MessageList({ chatHistory }: ChatHistoryProps) {

    return (
        <div data-te-perfect-scrollbar-init="true" className="w-[96%] h-[85%] flex flex-col justify-end overflow-auto hover:overflow-y-scroll absolute top-[8px] right-0 left-0 m-auto bg-white rounded-md">
            <div className="max-h-[85%] min-h">
                {chatHistory.map((message, id) => (
                    <Message key={id} message={message} isEven={id % 2 === 0} />
                ))}
            </div>
        </div>
    );
}


type MessageProps = {
    message: { name: string; id: string; text: string; color: string };
    isEven: boolean;
}

// single message
function Message({ message, isEven }: MessageProps) {
    const { selectedLanguage } = useLanguage();
    const translationData = Translations[selectedLanguage];

    
    const isCurrentUser = message.name === localStorage.getItem("username");
    const messageClass = isEven ? "px-1" : "bg-blue-100 px-1";
    const colorClass = message.color;
    const displayName = isCurrentUser
    ? translationData && translationData.you
    : message.name;
    return (
        <p key={message.id} className={`${messageClass} ${colorClass}`}>
            {displayName === "" ? message.text : `${displayName}: ${message.text}`}
        </p>
    );
}

export default MessageList;
