import { Movie } from "./movie";

export type CartItem = {
    movie: Movie,
    amount: number,
    price: number
}