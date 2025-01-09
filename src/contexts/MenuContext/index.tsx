import React, { createContext, useContext, useEffect, useState } from "react";
import { getMenu } from "../../services/MenuService";
import { Menu, MenuSectionItem } from "../../types/MenuTypes";

interface MenuContextData {
    menu: Menu | null; // Dados do menu
    loading: boolean; // Indicador de carregamento
    error: string | null; // Erro em caso de falha na requisição
    cart: MenuSectionItem[];
    addToCart: (item: MenuSectionItem, quantity: number) => void;
}

const MenuContext = createContext<MenuContextData | undefined>(undefined);

export const MenuProvider = ({ children }: any) => {
    const [menu, setMenu] = useState<Menu | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [cart, setCart] = useState<MenuSectionItem[]>([]);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                setLoading(true);
                const data = await getMenu(); // Chama o serviço que faz a requisição
                console.log("data: ", data);
                setMenu(data); // Salva os dados no estado
                setError(null);
            } catch (err: any) {
                setError(err.message || "Erro ao carregar o menu");
            } finally {
                setLoading(false);
            }
        };

        fetchMenu();
    }, []);

    const addToCart = (item: MenuSectionItem, quantity: number) => {
        setCart((prevCart) => {
            // Verifica se o item já existe no carrinho
            const existingItemIndex = prevCart.findIndex(
                (cartItem) => cartItem.id === item.id
            );

            if (existingItemIndex !== -1) {
                // Atualiza a quantidade do item existente
                const updatedCart = prevCart.map((cartItem, index) =>
                    index === existingItemIndex
                        ? {
                              ...cartItem,
                              quantity: cartItem.quantity + quantity,
                          }
                        : cartItem
                );
                return updatedCart;
            }

            // Adiciona um novo item ao carrinho
            return [...prevCart, { ...item, quantity }];
        });
    };

    return (
        <MenuContext.Provider value={{ menu, loading, error, cart, addToCart }}>
            {children}
        </MenuContext.Provider>
    );
};

// Hook personalizado para usar o contexto do menu
export const useMenu = (): MenuContextData => {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error("useMenu must be used within a MenuProvider");
    }
    return context;
};
