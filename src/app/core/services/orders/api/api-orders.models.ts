import { apiPizza, Sizes } from "../../pizzaCart/api/api-pizza-cart.models";

export interface ApiOrder {
    items: ApiItem[];
    total:number;
    
}

export interface ApiItem {
    pizza: string;
}