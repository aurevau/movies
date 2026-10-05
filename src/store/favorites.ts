import { Movie } from "@/domain/movie";
import { create } from "zustand";

type FavoritesState = {
    favorites: Movie[];
    toggle: (movie: Movie) => void;
};

export const useFavorites = create<FavoritesState>((set) => ({
    favorites: [],
    toggle: (movie) => set((state) => ({ favorites: state.favorites.some((m) => m.id === movie.id) ? state.favorites.filter((m) => m.id !== movie.id) : [...state.favorites, movie], }))
}));