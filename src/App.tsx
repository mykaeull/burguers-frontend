import React from "react";
import "./App.css";
import AppRoutes from "./routes";
import { MenuProvider } from "./contexts/MenuContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Toaster from "./components/Toaster";
import Header from "./components/Header";
import { BrowserRouter as Router } from "react-router-dom";
import LanguageToggle from "./components/LanguageToggle";

function App() {
    return (
        <LanguageProvider>
            <MenuProvider>
                <Router>
                    <div>
                        <LanguageToggle />
                        <Header />
                        <AppRoutes />
                        <Toaster />
                    </div>
                </Router>
            </MenuProvider>
        </LanguageProvider>
    );
}

export default App;
