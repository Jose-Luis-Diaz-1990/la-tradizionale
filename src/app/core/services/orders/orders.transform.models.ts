import { apiPizza, Sizes } from "../pizzaCart/api/api-pizza-cart.models";
import { Pizza } from "../pizzaCart/pizza-cart-transform.models";

export interface Order {
    items: any[];
    total:number;  
}

export interface Item {
    pizza: string;
}