import React from "react";
import Menu from "../Menu";
import Cart from "../Cart";

const MainMenu = () => {
    return (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-8 bg-[#F8F9FA] p-8">
            {/* Menu */}
            <section className="bg-white shadow-custom p-4 overflow-auto">
                <Menu />
            </section>

            {/* Carrinho */}
            <aside className="h-fit lg:sticky hidden md:block">
                <Cart />
            </aside>
        </div>
    );
};

export default MainMenu;
