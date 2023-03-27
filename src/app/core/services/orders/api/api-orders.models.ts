import { apiPizza, Sizes } from "../../pizzaCart/api/api-pizza-cart.models";
import { Pizza } from "../../pizzaCart/pizza-cart-transform.models";

export interface ApiOrder {
    items: any[];
    total:any;    
}
/*
export interface ApiItem {
    pizza:string;
}*/