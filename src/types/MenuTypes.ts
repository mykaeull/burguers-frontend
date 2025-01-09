export interface MenuSectionItem {
    id: number; // ID do item
    name: string; // Nome do item
    description?: string; // Descrição do item (opcional, pois alguns itens podem não ter descrição)
    price: number; // Preço do item
    image?: string; // URL da imagem do item (opcional)
    available?: boolean; // Indica se o item está disponível
    quantity: number;
}

export interface MenuSection {
    id: number; // ID da seção
    name: string; // Nome da seção (ex: "Burgers", "Drinks")
    items: MenuSectionItem[]; // Lista de itens dentro da seção
    image?: string; // URL da imagem associada à seção (opcional)
}

export interface Menu {
    id: number; // ID do menu
    name: string; // Nome do menu (ex: "FE TEST")
    sections: MenuSection[]; // Lista de seções no menu
}
