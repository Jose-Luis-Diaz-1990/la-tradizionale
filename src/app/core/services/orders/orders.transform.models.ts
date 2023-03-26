import { apiPizza, Sizes } from "../pizzaCart/api/api-pizza-cart.models";

export interface Order {
    items: Item[];
    total:number;  
}

export interface Item {
    pizza: string;
}