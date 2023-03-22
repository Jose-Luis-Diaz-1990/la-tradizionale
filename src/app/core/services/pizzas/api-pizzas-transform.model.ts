import { apiTransformIngredients } from './../ingredients/api-transform-ingredients.models';

export interface apiTransformPizzas {
    id: string;
    name: string;
    mass: string;
    size: string;
    dip: string;
    ingredients: apiTransformIngredients[];
    price: number;
    account: number;
    picture: string;
}