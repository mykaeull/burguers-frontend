import React from "react";
import { FiSearch } from "react-icons/fi";

interface InputSearchProps {
    placeholder?: string;
    onSearch?: (value: string) => void;
}

const InputSearch = ({
    placeholder = "Search menu items",
    onSearch,
}: InputSearchProps) => {
    const [value, setValue] = React.useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setValue(newValue);

        if (onSearch) {
            onSearch(newValue);
        }
    };

    return (
        <div className="flex items-center bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 shadow-sm w-full">
            <FiSearch className="text-gray-400 mr-3" size={20} />
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                className="flex-grow bg-transparent outline-none text-gray-800 placeholder-gray-400"
            />
        </div>
    );
};

export default InputSearch;
