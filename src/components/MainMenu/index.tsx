import React, { useState } from "react";
import Menu from "../Menu";
import Cart from "../Cart";
import InputSearch from "../InputSearch";
import { useMenu } from "../../contexts/MenuContext";
import { useTranslation } from "react-i18next";

const MainMenu = () => {
    const [searchValue, setSearchValue] = useState<string>("");

    const { filterMenu } = useMenu();

    const { t } = useTranslation();

    const handleSearch = (searchTerm: string) => {
        filterMenu(searchTerm);
        setSearchValue(searchTerm);
    };

    return (
        <>
            <InputSearch
                onSearch={handleSearch}
                placeholder={t("search_placeholder")}
            />

            <div className="mt-8 grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-8 bg-[#F8F9FA] p-0 sm:p-8">
                <section className="bg-white shadow-custom p-4 overflow-auto h-fit lg:sticky">
                    <Menu search={searchValue} />
                </section>

                <aside className="h-fit lg:sticky hidden md:block">
                    <Cart />
                </aside>
            </div>
        </>
    );
};

export default MainMenu;
