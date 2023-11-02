import React, { createContext, useContext, useState, ReactNode } from "react";

// Create a context to hold language-related data and functions
interface LanguageContextProps {
    selectedLanguage: string;
    updateLanguage: (language: string) => void;
}

export const Languages: string[] = ["English", "Français", "Nederlands", "Español", "Română"]

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

// Custom hook to access the language context
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};

// Define the LanguageProvider component
interface LanguageProviderProps {
    children: ReactNode;
}

// LanguageProvider component to wrap the application with language context
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    // Keep selected language on refresh
    const currentLanguage = localStorage.getItem("language") || "English";
    const [selectedLanguage, setSelectedLanguage] = useState<string>(currentLanguage);

    // Function to update the selected language
    const updateLanguage = (language: string) => {
        setSelectedLanguage(language);
    };

    return (
        // Provide the language context with selected language and update function
        <LanguageContext.Provider value={{ selectedLanguage, updateLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageContext;
