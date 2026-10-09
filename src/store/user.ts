import { Movie } from "@/domain/movie";
import { Order } from "@/domain/order";
import { User } from "@/domain/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useCart } from "./cart";

type UserState = {
    users: Record<string, User>;
    currentEmail: string | null;
    login: (name: string, email: string) => void;
    logout: () => void;
    toggleFavorite: (movie: Movie) => void;
    placeOrder: (name: string, email: string) => Order | null;
};

const userKey = (email: string) => email.trim().toLowerCase();

const newUser = (name: string, email: string): User => ({
    name: name.trim(),
    email: userKey(email),
    orders: [],
    favorites: [],
});

export const useUser = create<UserState>()(persist((set, get) => ({
    users: {},
    currentEmail: null,

    login: (name, email) => {
        const key = userKey(email);
        set((state) => ({
            currentEmail: key,
            users: {...state.users, [key]: state.users[key] ?? newUser(name, email)},
        }));
    },

    logout: () => {
        set({ currentEmail: null});
        useCart.getState().clearCart();
    },

    toggleFavorite: (movie) => set((state) => {
        const key = state.currentEmail;
        if(!key) return {};
        const user = state.users[key];
        const isFavorite = user.favorites.some((m) => m.id === movie.id);
        return {
            users: {
                ...state.users,
                [key]: {
                    ...user,
                    favorites: isFavorite ? user.favorites.filter((m) => m.id !== movie.id) : [...user.favorites, movie]
                }
            }
        };
    }),

    placeOrder: (name, email) => {
        const cart = useCart.getState().cart;
        if (cart.length === 0) return null;

        const key = userKey(email);
        const existing = get().users[key] ?? newUser(name, email);

        const order: Order = {
            id: Date.now().toString(),
            name: name.trim(),
            email: key,
            items: [...cart],
            totalAmount: cart.reduce((sum, i) => sum + i.price * i.amount, 0),
            createdAt: new Date().toISOString(),
        };

        set((state) => ({
            currentEmail: key,
            users: {...state.users, [key]: {
                ...existing, orders: [order, ...existing.orders]
            }}
        }));

        useCart.getState().clearCart();
        return order
    }
}),
{name: "user-storage", storage: createJSONStorage(() => AsyncStorage)}
))

export const useCurrentUser = () => useUser((s) => s.currentEmail ? s.users[s.currentEmail] : null);