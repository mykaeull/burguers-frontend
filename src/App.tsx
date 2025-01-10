import React from "react";
import "./App.css";
import AppRoutes from "./routes";
import { MenuProvider } from "./contexts/MenuContext";
import Header from "./components/Header";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
    return (
        <MenuProvider>
            <Router>
                <div>
                    <Header />
                    <AppRoutes />
                </div>
            </Router>
        </MenuProvider>
    );
}

export default App;
