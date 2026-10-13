import { Order } from "./order";

export type User = {
    name: string,
    email: string, 
    orders: Order[],
}