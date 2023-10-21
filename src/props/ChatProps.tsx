export interface ChatHistoryProps {
    chatHistory: { name: string; id: string; text: string; color: string }[];
}

export interface MessageProps {
    message: { name: string; id: string; text: string; color: string };
    isEven: boolean;
}

export interface ChatInputProps {
    message: string;
    setMessage: (message: string) => void;
    sendMessage: () => void;
}