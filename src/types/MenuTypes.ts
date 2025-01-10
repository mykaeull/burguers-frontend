export interface ModifierItem {
    id: number;
    name: string;
    price: number;
    maxChoices: number;
    available: boolean;
}

export interface Modifier {
    id: number;
    name: string;
    minChoices: number;
    maxChoices: number;
    items: ModifierItem[];
}

export interface MenuSectionItem {
    id: number;
    name: string;
    description?: string;
    price: number;
    image?: string;
    available?: boolean;
    quantity: number;
    identifier?: string;
    modifierOption?: string;
    modifiers?: Modifier[];
}

export interface MenuSection {
    id: number;
    name: string;
    items: MenuSectionItem[];
    image?: string;
}

export interface Menu {
    id: number;
    name: string;
    sections: MenuSection[];
}
