import React from "react";
import Navbar from "../Navbar";

const Header = () => {
    return (
        <header>
            <Navbar />
            <img
                src="/header.png"
                alt=""
                className="w-full object-cover min-h-32 min-w-20"
            ></img>
        </header>
    );
};

export default Header;
