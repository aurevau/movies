import { CartItem } from "./cart-item";

export type Order = {
    id: string;
    name: string;
    email: string;
    items: CartItem[];
    totalAmount: number;
    createdAt: string;
}