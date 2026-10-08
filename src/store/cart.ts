import { CartItem } from "@/domain/cart-item";
import { Movie } from "@/domain/movie";
import { Order } from "@/domain/order";
import { create } from "zustand";

type CartState = {
    cart: CartItem[];
    orders: Order[];
    addToCart: (movie: Movie, price: number) => void;
    deleteFromCart: (movieId: number) => void;
    decrease: (movieId: number) => void;
    clearCart: () => void;
    placeOrder: (name: string, email: string) => Order | null;
};

export const useCart = create<CartState>((set, get) => ({
    cart: [],
    orders: [],

    addToCart: (movie, price) =>
        set((state) => {
            const exists = state.cart.some((i) =>
                i.movie.id === movie.id);
            return {
                cart: exists ? state.cart.map((i) => (i.movie.id === movie.id ? { ...i, amount: i.amount + 1 } : i))
                    : [...state.cart, { movie, amount: 1, price }]
            };
        }),

    deleteFromCart: (movieId) =>
        set((state) => ({
            cart: state.cart.filter((i) => i.movie.id !== movieId),
        })),
    decrease: (movieId) =>
        set((state) => ({
            cart: state.cart.map((i) => (i.movie.id === movieId ? { ...i, amount: i.amount - 1 } : i)).filter((i) => i.amount > 0),
        })),

    clearCart: () => set({ cart: [] }),

    placeOrder: (name, email) => {
        const {cart} = get();
        if (cart.length === 0) return null;

        const order: Order = {
            id: Date.now().toString(),
            name,
            email,
            items: [...cart],
            totalAmount: cart.reduce((sum, i) => sum + i.price * i.amount, 0),
            createdAt: new Date().toISOString(),
        };

        set((state) => ({
            orders: [order, ...state.orders],
            cart: [],
        }));

        return order;
    }
}));

