import React, { useState } from "react";
import { useMenu } from "../../contexts/MenuContext";
import Modal from "../Modal";
import Cart from ".";

const FloatingCartButton = () => {
    const { cart } = useMenu();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const isCartEmpty = cart.length === 0;

    return (
        <>
            {/* Botão flutuante */}
            <button
                onClick={openModal}
                disabled={isCartEmpty}
                className={`text-md block md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-2 rounded-full text-white font-bold ${
                    isCartEmpty
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-brown-700 hover:bg-[#8d4d37] transition duration-200"
                }`}
            >
                Abrir carrinho
            </button>

            {/* Modal contendo o Cart */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <Cart />
            </Modal>
        </>
    );
};

export default FloatingCartButton;
