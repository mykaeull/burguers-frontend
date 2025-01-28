import React from "react";
import Navbar from "../Navbar";
import LazyImage from "../LazyImage";

const Header = () => {
    return (
        <header>
            <Navbar />
            <LazyImage
                image="/header.png"
                altName="header-image"
                className="w-full object-cover min-h-32 min-w-20"
            />
        </header>
    );
};

export default Header;
