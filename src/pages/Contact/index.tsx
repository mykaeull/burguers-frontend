import React from "react";
import { useTranslation } from "react-i18next";
import { MdConstruction } from "react-icons/md";

function Contact() {
    const { t } = useTranslation();

    return (
        <div className="text-center mt-8 flex justify-center flex-col items-center gap-4">
            <MdConstruction size={80} />
            <h1 className="text-3xl font-semibold">
                {t("contact_page_construction")}
            </h1>
        </div>
    );
}

export default Contact;
