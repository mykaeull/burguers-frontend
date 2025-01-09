import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useMenu } from "../../contexts/MenuContext";
import Categories from "./Categories";
import Modal from "../Modal";
import { FaPlus, FaMinus } from "react-icons/fa";

const Menu = () => {
    const { menu, loading, error, addToCart } = useMenu();

    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
    const [selectedItem, setSelectedItem] = useState<any>(null); // Item selecionado para o modal
    const [quantity, setQuantity] = useState(1); // Quantidade do item no modal
    const [isModalOpen, setIsModalOpen] = useState(false); // Controle do modal

    const toggleCategory = (category: string) => {
        // Adiciona ou remove a categoria do array de categorias expandidas
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
        setQuantity(1); // Reseta a quantidade para 1 ao abrir o modal
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    const handleAddToCart = () => {
        if (selectedItem) {
            addToCart(selectedItem, quantity); // Chama a função do contexto para adicionar ao carrinho
        }
        handleCloseModal();
    };

    if (loading) {
        return <p>Carregando o menu...</p>;
    }

    if (error) {
        return <p>Erro ao carregar o menu: {error}</p>;
    }

    return (
        <div>
            <Categories
                expandedCategories={expandedCategories}
                setExpandedCategories={setExpandedCategories}
            />

            {menu?.sections.map((section) => (
                <div key={section.id} className="mb-6">
                    <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleCategory(section.name)}
                    >
                        <h1 className="text-xl font-bold text-blackMenu">
                            {section.name}
                        </h1>
                        {expandedCategories.includes(section.name) ? (
                            <FiChevronUp size={24} color="#4F372F" />
                        ) : (
                            <FiChevronDown size={24} color="#4F372F" />
                        )}
                    </div>

                    {/* Verifica se a categoria está expandida */}
                    {expandedCategories.includes(section.name) && (
                        <div className="mt-4">
                            {section.items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between items-center mb-4 cursor-pointer"
                                    onClick={() => handleOpenModal(item)}
                                >
                                    <div className="w-[80%]">
                                        <h3 className="font-bold text-blackMenu">
                                            {item.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {item.description}
                                        </p>
                                        <p className="text-sm font-bold">
                                            {`R$ ${item.price.toFixed(2)}`}
                                        </p>
                                    </div>
                                    {item.image && (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-20 h-20 object-cover rounded-md"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                {selectedItem && (
                    <div>
                        <img
                            src={selectedItem.image}
                            alt={selectedItem.name}
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-6">
                            <h2 className="text-lg font-bold">
                                {selectedItem.name}
                            </h2>
                            <p className="text-sm text-gray-600 mt-2">
                                {selectedItem.description}
                            </p>
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
                                className="w-full mt-4 bg-brown-700 text-white py-2 rounded-3xl font-bold"
                                onClick={handleAddToCart}
                            >
                                Adicionar ao carrinho • R${" "}
                                {(selectedItem.price * quantity).toFixed(2)}
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Menu;
