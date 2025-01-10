import { Menu } from "../types/MenuTypes";
import api from "./api";

export async function getMenu() {
    const menuUrl = "challenge/menu";
    const response = await api.get(menuUrl);

    const data = response.data;

    const menu: Menu = {
        id: data.id,
        name: data.name,
        sections: data.sections.map((section: any) => ({
            id: section.id,
            name: section.name,
            image: section.images?.[0]?.image || null, // Usa a primeira imagem da seção, se disponível
            items: section.items.map((item: any) => ({
                id: item.id,
                name: item.name,
                description: item.description || null,
                price: item.price,
                image: item.images?.[0]?.image || null, // Usa a primeira imagem do item, se disponível
                available: item.available,
                modifiers:
                    item.modifiers?.map((modifier: any) => ({
                        id: modifier.id,
                        name: modifier.name,
                        minChoices: modifier.minChoices,
                        maxChoices: modifier.maxChoices,
                        items: modifier.items.map((modifierItem: any) => ({
                            id: modifierItem.id,
                            name: modifierItem.name,
                            price: modifierItem.price,
                            maxChoices: modifierItem.maxChoices || 1,
                            available: modifierItem.available,
                        })),
                    })) || null, // Apenas inclui modificadores se existirem
            })),
        })),
    };

    return menu;
}
