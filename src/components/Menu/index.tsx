import React, { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useMenu } from "../../contexts/MenuContext";
import Categories from "./Categories";
import Modal from "../Modal";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { convertCurrency, formatCurrency } from "../../utils";
import { useLanguage } from "../../contexts/LanguageContext";
import LoadingSpinner from "../LoadingSpinner";
import LazyImage from "../LazyImage";

interface MenuProps {
    search: string;
}

const Menu = ({ search }: MenuProps) => {
    const { menu, loading, error, addToCart, cart } = useMenu();

    const { t } = useTranslation();

    const { language } = useLanguage();

    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [selectedModifierPrice, setSelectedModifierPrice] =
        useState<number>(0);
    const [quantity, setQuantity] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (search && menu) {
            const categoriesWithResults = menu.sections
                .filter((section) => section.items.length > 0)
                .map((section) => section.name);
            setExpandedCategories(categoriesWithResults);
        }
    }, [search]);

    const toggleCategory = (category: string) => {
        if (expandedCategories.includes(category)) {
            setExpandedCategories(
                expandedCategories.filter((c) => c !== category)
            );
        } else {
            setExpandedCategories([...expandedCategories, category]);
        }
    };

    const handleOpenModal = (item: any) => {
        setSelectedItem(item);
        setQuantity(1);

        if (item.modifiers?.length) {
            setSelectedModifierPrice(item.modifiers[0].items[0]?.price || 0);
        } else {
            setSelectedModifierPrice(0);
        }

        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
        setSelectedModifierPrice(0);
    };

    const handleAddToCart = () => {
        if (selectedItem) {
            const itemToAdd = {
                ...selectedItem,
                price: selectedModifierPrice || selectedItem.price,
            };

            addToCart(itemToAdd, quantity);
        }
        handleCloseModal();
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <p>Erro ao carregar o menu: {error}</p>;
    }

    const hasItems = menu?.sections.some((section) => section.items.length > 0);

    return (
        <div>
            <Categories
                expandedCategories={expandedCategories}
                setExpandedCategories={setExpandedCategories}
            />

            {!hasItems ? (
                <p className="text-center mt-8 text-lg text-gray-600">
                    {t("item_not_found")}
                </p>
            ) : (
                menu?.sections.map((section) => (
                    <div
                        key={section.id}
                        className="mb-6"
                        id={String(section.id)}
                    >
                        <div
                            className="flex justify-between items-center cursor-pointer"
                            onClick={() => toggleCategory(section.name)}
                        >
                            <h1 className="text-xl font-bold text-blackMenu">
                                {section.name === "Desserts"
                                    ? t("desserts")
                                    : section.name}
                            </h1>
                            {expandedCategories.includes(section.name) ? (
                                <FiChevronUp size={24} color="#4F372F" />
                            ) : (
                                <FiChevronDown size={24} color="#4F372F" />
                            )}
                        </div>

                        {expandedCategories.includes(section.name) && (
                            <div className="mt-4">
                                {section.items.map((item) => {
                                    const defaultPrice =
                                        item.price === 0 &&
                                        item.modifiers?.length
                                            ? item.modifiers[0].items[0]
                                                  ?.price || 0
                                            : item.price;

                                    return (
                                        <div
                                            key={item.id}
                                            className="flex justify-between items-start mb-4 cursor-pointer"
                                            onClick={() =>
                                                handleOpenModal(item)
                                            }
                                        >
                                            <div className="w-[80%]">
                                                <div className="flex items-center gap-2">
                                                    {cart.find(
                                                        (e) =>
                                                            e.name === item.name
                                                    )?.quantity && (
                                                        <div className="rounded-md text-white text-sm bg-brown-700 w-5 h-5 text-center">
                                                            {
                                                                cart.find(
                                                                    (e) =>
                                                                        e.name ===
                                                                        item.name
                                                                )?.quantity
                                                            }
                                                        </div>
                                                    )}

                                                    <h3 className="font-bold text-blackMenu">
                                                        {item.name}
                                                    </h3>
                                                </div>
                                                <p className="text-sm text-gray-500">
                                                    {item.description}
                                                </p>
                                                <p className="text-sm font-bold">
                                                    {`${formatCurrency(
                                                        convertCurrency(
                                                            defaultPrice,
                                                            "BRL",
                                                            language === "en"
                                                                ? "USD"
                                                                : "BRL"
                                                        ),
                                                        language === "en"
                                                            ? "USD"
                                                            : "BRL"
                                                    )}`}
                                                </p>
                                            </div>
                                            {item.image && (
                                                <LazyImage
                                                    image={item.image}
                                                    altName={item.name}
                                                    className="w-20 h-20 object-cover rounded-md"
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                ))
            )}

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                {selectedItem && (
                    <div>
                        {selectedItem.image && (
                            <LazyImage
                                image={selectedItem.image}
                                altName={selectedItem.name}
                                className="w-full h-64 object-cover"
                            />
                        )}

                        <div className="p-6">
                            <h2 className="text-2xl font-bold">
                                {selectedItem.name}
                            </h2>
                            <p className="text-sm text-gray-600 mt-2">
                                {selectedItem.description}
                            </p>

                            {selectedItem.modifiers?.length && (
                                <div className="mt-4">
                                    <h3 className="text-lg font-bold">
                                        {t("choose_size")}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {t("select_one_option")}
                                    </p>

                                    <div className="mt-2">
                                        {selectedItem.modifiers[0].items.map(
                                            (modifier: any) => (
                                                <label
                                                    key={modifier.id}
                                                    className="flex items-center gap-2 py-2 cursor-pointer"
                                                >
                                                    <input
                                                        type="radio"
                                                        name="modifier"
                                                        value={modifier.price}
                                                        checked={
                                                            selectedModifierPrice ===
                                                            modifier.price
                                                        }
                                                        onChange={() =>
                                                            setSelectedModifierPrice(
                                                                modifier.price
                                                            )
                                                        }
                                                        className="form-radio text-brown-700 focus:ring-brown-700"
                                                    />
                                                    <span className="text-sm font-medium text-gray-800">
                                                        {modifier.name}
                                                    </span>
                                                    <span className="text-sm text-gray-600 ml-auto">
                                                        {formatCurrency(
                                                            convertCurrency(
                                                                modifier.price,
                                                                "BRL",
                                                                language ===
                                                                    "en"
                                                                    ? "USD"
                                                                    : "BRL"
                                                            ),
                                                            language === "en"
                                                                ? "USD"
                                                                : "BRL"
                                                        )}
                                                    </span>
                                                </label>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center justify-center gap-8 mt-4">
                                <button
                                    className={`text-white ${
                                        quantity === 1
                                            ? "bg-gray-300"
                                            : "bg-brown-700"
                                    } rounded-full w-10 h-10 flex items-center justify-center`}
                                    onClick={() =>
                                        setQuantity((prev) =>
                                            Math.max(1, prev - 1)
                                        )
                                    }
                                    disabled={quantity === 1}
                                >
                                    <FaMinus size={20} />
                                </button>
                                <span className="text-xl font-bold">
                                    {quantity}
                                </span>
                                <button
                                    className="text-white bg-brown-700 rounded-full w-10 h-10 flex items-center justify-center"
                                    onClick={() =>
                                        setQuantity((prev) => prev + 1)
                                    }
                                >
                                    <FaPlus size={20} />
                                </button>
                            </div>

                            <button
                                className="w-full mt-4 bg-brown-700 text-white py-2 rounded-3xl font-bold hover:bg-[#8d4d37] transition duration-200"
                                onClick={handleAddToCart}
                            >
                                {t("add_to_cart")} •{" "}
                                {formatCurrency(
                                    convertCurrency(
                                        quantity *
                                            (selectedItem.modifiers?.length
                                                ? selectedModifierPrice
                                                : selectedItem.price),
                                        "BRL",
                                        language === "en" ? "USD" : "BRL"
                                    ),
                                    language === "en" ? "USD" : "BRL"
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Menu;
