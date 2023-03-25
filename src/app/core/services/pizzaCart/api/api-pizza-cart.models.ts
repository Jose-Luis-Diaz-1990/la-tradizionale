import { apiIngredient } from '../../ingredients/api/api-ingradients.models';

export interface apiPizza {
    _id: string;
    name: string;
    mass: string;
    size: string;
    dip: string;
    ingredients: apiIngredient[];
    price: number;
    account: number;
    cantidad: number;
    picture: string;
    createdAt?: string;
    updatedAt?: string;
    
}