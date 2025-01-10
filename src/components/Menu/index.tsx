import React, { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useMenu } from "../../contexts/MenuContext";
import Categories from "./Categories";
import Modal from "../Modal";
import { FaPlus, FaMinus } from "react-icons/fa";

interface MenuProps {
    search: string;
}

const Menu = ({ search }: MenuProps) => {
    const { menu, loading, error, addToCart, cart } = useMenu();

    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
    const [selectedItem, setSelectedItem] = useState<any>(null); // Item selecionado para o modal
    const [selectedModifierPrice, setSelectedModifierPrice] =
        useState<number>(0); // Preço do modificador selecionado
    const [quantity, setQuantity] = useState(1); // Quantidade do item no modal
    const [isModalOpen, setIsModalOpen] = useState(false); // Controle do modal

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
        setQuantity(1); // Reseta a quantidade para 1 ao abrir o modal

        // Define o preço do modificador padrão, se aplicável
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
        setSelectedModifierPrice(0); // Reseta o modificador ao fechar
    };

    const handleAddToCart = () => {
        if (selectedItem) {
            // Cria o item com o preço do modificador, se aplicável
            const itemToAdd = {
                ...selectedItem,
                price: selectedModifierPrice || selectedItem.price,
            };

            addToCart(itemToAdd, quantity); // Adiciona ao carrinho
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
                <div key={section.id} className="mb-6" id={String(section.id)}>
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

                    {expandedCategories.includes(section.name) && (
                        <div className="mt-4">
                            {section.items.map((item) => {
                                const defaultPrice =
                                    item.price === 0 && item.modifiers?.length
                                        ? item.modifiers[0].items[0]?.price || 0
                                        : item.price;

                                return (
                                    <div
                                        key={item.id}
                                        className="flex justify-between items-center mb-4 cursor-pointer"
                                        onClick={() => handleOpenModal(item)}
                                    >
                                        <div className="w-[80%]">
                                            <div className="flex items-center gap-2">
                                                {cart.find(
                                                    (e) => e.name === item.name
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
                                                {`R$ ${defaultPrice.toFixed(
                                                    2
                                                )}`}
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
                                );
                            })}
                        </div>
                    )}
                </div>
            ))}

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                {selectedItem && (
                    <div>
                        {selectedItem.image && (
                            <img
                                src={selectedItem.image}
                                alt={selectedItem.name}
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

                            {/* Exibição de modifiers */}
                            {selectedItem.modifiers?.length && (
                                <div className="mt-4">
                                    <h3 className="text-lg font-bold">
                                        {selectedItem.modifiers[0].name}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {`Selecione 1 opção`}
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
                                                        R${" "}
                                                        {modifier.price.toFixed(
                                                            2
                                                        )}
                                                    </span>
                                                </label>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Controles de quantidade */}
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

                            {/* Botão de adicionar ao carrinho */}
                            <button
                                className="w-full mt-4 bg-brown-700 text-white py-2 rounded-3xl font-bold hover:bg-[#8d4d37] transition duration-200"
                                onClick={handleAddToCart}
                            >
                                Adicionar ao carrinho • R${" "}
                                {(
                                    quantity *
                                    (selectedItem.modifiers?.length
                                        ? selectedModifierPrice
                                        : selectedItem.price)
                                ).toFixed(2)}
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Menu;
