import { CartItem } from "@/domain/cart-item";
import { Movie } from "@/domain/movie";
import { create } from "zustand";

type CartState = {
    cart: CartItem[];
    addToCart: (movie: Movie, price: number) => void;
    deleteFromCart: (movieId: number) => void;
    decrease: (movieId: number) => void;
    clearCart: () => void;
};

export const useCart = create<CartState>((set) => ({
    cart: [],

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

    clearCart: () => set({ cart: [] })
}));

