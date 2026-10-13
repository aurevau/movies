import { Movie } from "@/domain/movie";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type FavoritesState = {
    favorites: Movie[];
    toggle: (movie: Movie) => void;
};

export const useFavorites = create<FavoritesState>()(
    persist(
        (set) => ({
            favorites: [],
            toggle: (movie) => set((state) => ({
                favorites: state.favorites.some((m) => m.id === movie.id)
                    ? state.favorites.filter((m) => m.id !== movie.id)
                    : [...state.favorites, movie],
            })),
        }),
        { name: "favorites-storage", storage: createJSONStorage(() => AsyncStorage) }
    )
);