import { apiPizza, Sizes } from "../../pizzaCart/api/api-pizza-cart.models";

export interface ItemOrder {
    _id: string;
    pizza:apiPizza
    size:Sizes;
    quantity:Number;
    price:Number;
    createdAt?: string;
    updatedAt?: string;    
}