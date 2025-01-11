import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Contact from "../pages/Contact";
import { useTranslation } from "react-i18next";

const NotFound = () => {
    const { t } = useTranslation();

    return (
        <h1 className="text-center mt-8 text-3xl font-semibold">
            {t("not_found")}
        </h1>
    );
};

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
