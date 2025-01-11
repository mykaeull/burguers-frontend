import React, { useState } from "react";
import { useMenu } from "../../contexts/MenuContext";
import Modal from "../Modal";
import Cart from ".";
import { useTranslation } from "react-i18next";

const FloatingCartButton = () => {
    const { cart } = useMenu();
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const isCartEmpty = cart.length === 0;

    return (
        <>
            <button
                onClick={openModal}
                disabled={isCartEmpty}
                className={`text-md block md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-2 rounded-full text-white font-bold ${
                    isCartEmpty
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-brown-700 hover:bg-[#8d4d37] transition duration-200"
                }`}
            >
                {t("open_cart")}
            </button>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <Cart setIsModalOpen={setIsModalOpen} />
            </Modal>
        </>
    );
};

export default FloatingCartButton;
