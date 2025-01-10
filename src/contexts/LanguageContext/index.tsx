import React, { createContext, useContext, useEffect, useState } from "react";
import i18n from "../../i18n/i18n";

interface LanguageContextData {
    language: string;
    toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextData | undefined>(
    undefined
);

export const LanguageProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [language, setLanguage] = useState<string>(
        localStorage.getItem("language") || "pt"
    );

    useEffect(() => {
        i18n.changeLanguage(language);
        localStorage.setItem("language", language);
    }, [language]);

    const toggleLanguage = () => {
        setLanguage((prevLanguage) => (prevLanguage === "pt" ? "en" : "pt"));
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
