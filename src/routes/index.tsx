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
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route path="/contact" element={<Contact />} />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
