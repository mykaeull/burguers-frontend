import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";

const LanguageToggle = () => {
    const { language, toggleLanguage } = useLanguage();

    return (
        <div className="absolute top-4 left-4 sm:left-8 flex items-center justify-center">
            <div
                className="relative p-2 w-16 h-8 bg-[#36221c] rounded-full flex items-center justify-between"
                style={{ zIndex: 9999 }}
            >
                <h3 className="text-sm text-white font-semibold">PT</h3>
                <div
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md cursor-pointer transform transition-transform duration-300 ${
                        language === "pt" ? "translate-x-0" : "translate-x-8"
                    }`}
                    style={{ zIndex: 9999 }}
                    onClick={toggleLanguage}
                ></div>
                <h3 className="text-sm text-white font-semibold">EN</h3>
            </div>
        </div>
    );
};

export default LanguageToggle;
