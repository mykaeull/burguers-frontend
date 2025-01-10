import React from "react";
import MainMenu from "../../components/MainMenu";
import FloatingCartButton from "../../components/Cart/FloatingCartButton";

function Home() {
    return (
        <>
            <main className="px-4 sm:px-6 md:px-16 lg:px-32 xl:px-52 py-6">
                <MainMenu />
            </main>

            <FloatingCartButton />
        </>
    );
}

export default Home;
