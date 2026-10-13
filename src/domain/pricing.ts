import { CartItem } from "./cart-item";
import { Movie } from "./movie";

export const getPrice = (movie: Movie): number => {
    const rating = movie.vote_average;

    if (rating >= 8) return 129;
    if (rating >= 7) return 99;
    if (rating >= 6) return 79;
    return 59;
}

export const formatPrice = (price: number) => `${price} kr`

export const calculateTotal = (items: CartItem[]): number => items.reduce((sum, item) => sum + item.price * item.amount, 0);