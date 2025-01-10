import React from "react";
import "./App.css";
import AppRoutes from "./routes";
import { MenuProvider } from "./contexts/MenuContext";
import Header from "./components/Header";
import { BrowserRouter as Router } from "react-router-dom";
import Toaster from "./components/Toaster";

function App() {
    return (
        <MenuProvider>
            <Router>
                <div>
                    <Header />
                    <AppRoutes />
                    <Toaster />
                </div>
            </Router>
        </MenuProvider>
    );
}

export default App;
