import React from "react";
import { useMenu } from "../../contexts/MenuContext";
import { FaPlus, FaMinus } from "react-icons/fa";

const Cart = () => {
    const { cart, addToCart } = useMenu();

    const calculateTotal = () =>
        cart.reduce((total, item) => {
            const defaultPrice =
                item.price === 0 && item.modifiers?.length
                    ? item.modifiers[0].items[0]?.price || 0
                    : item.price;

            return total + defaultPrice * item.quantity;
        }, 0);

    return (
        <div className="bg-white shadow-custom rounded-md">
            <div className="bg-[#F8F9FA] p-4">
                <h2 className="text-lg font-bold text-gray-800">Carrinho</h2>
            </div>

            <div className="p-4">
                {cart.length === 0 ? (
                    <p className="mt-2 text-sm text-gray-600">
                        Seu carrinho está vazio
                    </p>
                ) : (
                    <>
                        <div className="max-h-96 overflow-y-scroll custom-scrollbar">
                            {cart.map((item) => {
                                const defaultPrice =
                                    item.price === 0 && item.modifiers?.length
                                        ? item.modifiers[0].items[0]?.price || 0
                                        : item.price;

                                return (
                                    <div
                                        key={item.id}
                                        className="flex justify-between items-start mb-4"
                                    >
                                        <div>
                                            <h3 className="text-md lg:text-lg font-bold">
                                                {item.name}
                                            </h3>
                                            <h4 className="text-sm">
                                                {item?.modifiers
                                                    ? item.modifiers[0].items.find(
                                                          (e) =>
                                                              e.price ===
                                                              defaultPrice
                                                      )?.name
                                                    : ""}
                                            </h4>
                                            <div className="flex items-center gap-3 ml-2 mt-2">
                                                {/* Botão de diminuir quantidade */}
                                                <button
                                                    className="text-white bg-brown-700 rounded-full w-6 h-6 flex items-center justify-center"
                                                    onClick={() =>
                                                        addToCart(item, -1)
                                                    }
                                                >
                                                    <FaMinus size={10} />
                                                </button>

                                                {/* Quantidade */}
                                                <span className="text-md font-bold">
                                                    {item.quantity}
                                                </span>

                                                {/* Botão de aumentar quantidade */}
                                                <button
                                                    className="text-white bg-brown-700 rounded-full w-6 h-6 flex items-center justify-center"
                                                    onClick={() =>
                                                        addToCart(item, 1)
                                                    }
                                                >
                                                    <FaPlus size={10} />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-md lg:text-lg font-bold">
                                            R$
                                            {(
                                                defaultPrice * item.quantity
                                            ).toFixed(2)}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Subtotal */}
                        <div className="mt-4 pt-4">
                            <div className="flex justify-between text-md lg:text-lg mb-2 pb-2">
                                <span>Sub total</span>
                                <span>R$ {calculateTotal().toFixed(2)}</span>
                            </div>
                            <div className="border-t pt-4 w-full" />
                            <div className="flex justify-between text-xl lg:text-2xl">
                                <span>Total:</span>
                                <span>R$ {calculateTotal().toFixed(2)}</span>
                            </div>
                        </div>

                        <button className="w-full mt-8 bg-brown-700 text-white py-2 rounded-3xl font-bold hover:bg-[#8d4d37] transition duration-200">
                            Finalizar compra
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;
