import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Contact from "../pages/Contact";

const NotFound = () => (
    <h1 className="text-center mt-8 text-3xl font-semibold">
        404 - Página Não Encontrada
    </h1>
);

const AppRoutes = () => {
    return (
        <Routes>
            {/* Rota Home */}
            <Route path="/" element={<Home />} />

            {/* Rota Login */}
            <Route path="/login" element={<Login />} />

            {/* Rota Contact */}
            <Route path="/contact" element={<Contact />} />

            {/* Redireciona para 404 se a rota não for encontrada */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
