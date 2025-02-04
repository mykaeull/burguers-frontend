import React, { createContext, useContext, useEffect, useState } from "react";
import { getMenu } from "../../services/MenuService";
import { Menu, MenuSectionItem } from "../../types/MenuTypes";

interface MenuContextData {
    menu: Menu | null;
    loading: boolean;
    error: string | null;
    cart: MenuSectionItem[];
    addToCart: (item: MenuSectionItem, quantity: number) => void;
    filterMenu: (searchTerm: string) => void;
    clearCart: () => void;
}

const MenuContext = createContext<MenuContextData | undefined>(undefined);

export const MenuProvider = ({ children }: any) => {
    const [menu, setMenu] = useState<Menu | null>(null);
    const [originalMenu, setOriginalMenu] = useState<Menu | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [cart, setCart] = useState<MenuSectionItem[]>(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            try {
                return JSON.parse(storedCart);
            } catch {
                console.error("Erro ao parsear o carrinho do localStorage");
                return [];
            }
        }
        return [];
    });

    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem("cart", JSON.stringify(cart));
        } else {
            localStorage.removeItem("cart");
        }
    }, [cart]);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                setLoading(true);
                const data = await getMenu();
                setMenu(data);
                setOriginalMenu(data);
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
            const existingItemIndex = prevCart.findIndex(
                (cartItem) => cartItem.id === item.id
            );

            if (existingItemIndex !== -1) {
                const updatedCart = prevCart.map((cartItem, index) => {
                    if (index === existingItemIndex) {
                        const updatedQuantity = cartItem.quantity + quantity;

                        if (updatedQuantity <= 0) {
                            return undefined;
                        }

                        return {
                            ...cartItem,
                            quantity: updatedQuantity,
                        };
                    }
                    return cartItem;
                });

                return updatedCart.filter(
                    (cartItem): cartItem is MenuSectionItem =>
                        cartItem !== undefined
                );
            }

            if (quantity > 0) {
                return [...prevCart, { ...item, quantity }];
            }

            return prevCart;
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    const filterMenu = (searchTerm: string) => {
        if (!originalMenu) return;

        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        const filteredSections = originalMenu.sections
            .map((section) => {
                const filteredItems = section.items.filter((item) =>
                    item.name.toLowerCase().includes(lowerCaseSearchTerm)
                );
                return {
                    ...section,
                    items: filteredItems,
                };
            })
            .filter((section) => section.items.length > 0);

        setMenu({
            ...originalMenu,
            sections: filteredSections,
        });
    };

    return (
        <MenuContext.Provider
            value={{
                menu,
                loading,
                error,
                cart,
                addToCart,
                filterMenu,
                clearCart,
            }}
        >
            {children}
        </MenuContext.Provider>
    );
};

export const useMenu = (): MenuContextData => {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error("useMenu must be used within a MenuProvider");
    }
    return context;
};
