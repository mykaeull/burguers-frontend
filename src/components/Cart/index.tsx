import React from "react";

const Cart = () => {
    return (
        <div className="hidden md:block bg-white shadow-custom rounded-md">
            <div className="bg-[#F8F9FA] p-4">
                <h2 className="text-lg font-bold text-gray-800">Carrinho</h2>
            </div>

            <div className="p-4">
                <p className="mt-2 text-sm text-gray-600">
                    Seu carrinho está vazio
                </p>
            </div>
        </div>
    );
};

export default Cart;
