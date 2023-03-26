import { apiTransformIngredients } from '../ingredients/api-transform-ingredients.models';

export interface Pizza {
    _id: string;
    name: string;
    mass: string;
    size: string;
    dip: string;
    ingredients: apiTransformIngredients[];    
    price: number;
    pricebase:number;
    account: number;
    picture: string;
}