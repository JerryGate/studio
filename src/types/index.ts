export interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    dataAiHint?: string;
    description?: string;
    category: string;
    stock: number;
}

export interface CartItem extends Product {
    quantity: number;
}
