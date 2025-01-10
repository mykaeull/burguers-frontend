import React from "react";
import "./App.css";
import InputSearch from "./components/InputSearch";
import Header from "./components/Header";
import MainMenu from "./components/MainMenu";
import { MenuProvider } from "./contexts/MenuContext";
import FloatingCartButton from "./components/Cart/FloatingCartButton";

function App() {
    return (
        <MenuProvider>
            <div>
                <Header />

                <main className="px-4 sm:px-6 md:px-16 lg:px-32 xl:px-52 py-6">
                    <InputSearch />

                    <MainMenu />
                </main>

                <FloatingCartButton />
            </div>
        </MenuProvider>
    );
}

export default App;
