import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="bg-brown-700 text-white relative">
            {/* Desktop Navbar */}
            <div className="hidden md:flex justify-center items-center px-8 py-4">
                <ul className="flex space-x-8">
                    <li className="w-32 relative group text-lg">
                        <a
                            href="/"
                            className={`flex justify-center ${
                                isActive("/") ? "active" : ""
                            }`}
                        >
                            MENU
                        </a>
                        <span
                            className={`w-32 absolute left-0 top-10 h-1 bg-white transform ${
                                isActive("/")
                                    ? "scale-y-100 group-hover:scale-y-100"
                                    : "scale-x-0 group-hover:scale-x-100"
                            } transition-transform duration-300`}
                        ></span>
                    </li>
                    <li className="w-32 relative group text-lg">
                        <a
                            href="/login"
                            className={`flex justify-center ${
                                isActive("/login") ? "active" : ""
                            }`}
                        >
                            ENTRAR
                        </a>
                        <span
                            className={`w-32 absolute left-0 top-10 h-1 bg-white transform ${
                                isActive("/login")
                                    ? "scale-y-100 group-hover:scale-y-100"
                                    : "scale-x-0 group-hover:scale-x-100"
                            } transition-transform duration-300`}
                        ></span>
                    </li>
                    <li className="w-32 relative group text-lg">
                        <a
                            href="/contact"
                            className={`flex justify-center ${
                                isActive("/contact") ? "active" : ""
                            }`}
                        >
                            CONTATO
                        </a>
                        <span
                            className={`w-32 absolute left-0 top-10 h-1 bg-white transform ${
                                isActive("/contact")
                                    ? "scale-y-100 group-hover:scale-y-100"
                                    : "scale-x-0 group-hover:scale-x-100"
                            } transition-transform duration-300`}
                        ></span>
                    </li>
                </ul>
            </div>

            {/* Mobile Navbar */}
            <div className="md:hidden flex justify-center relative items-center px-4 py-4">
                <h1 className="text-lg font-bold">Menu</h1>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`focus:outline-none absolute right-6 rounded transform transition-transform duration-500 ${
                        isOpen ? "rotate-90" : " rotate-180"
                    }`}
                >
                    {isOpen ? (
                        <IoCloseCircleOutline size={28} />
                    ) : (
                        <GiHamburgerMenu size={28} />
                    )}
                </button>
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute text-center top-[99%] left-0 w-full bg-brown-700 text-white flex flex-col items-start px-4 py-4 space-y-4 z-50">
                    <a href="/" className="block w-full hover:underline">
                        MENU
                    </a>
                    <a href="/login" className="block w-full hover:underline">
                        ENTRAR
                    </a>
                    <a href="/contact" className="block w-full hover:underline">
                        CONTATO
                    </a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
