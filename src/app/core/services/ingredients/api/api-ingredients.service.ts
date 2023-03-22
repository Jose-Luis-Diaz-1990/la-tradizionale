import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiIngredient } from './api-ingradients.models';

const API_INGREDIENTS_URL = 'https://back-pizza.vercel.app';

@Injectable({
  providedIn: 'root'
})
export class ApiIngredientsService {

  constructor( private http: HttpClient) { }
  //GET al api para traer los ingredientes de la BD
  public getApiIngredients(): Observable<apiIngredient[]>{
    return this.http.get<apiIngredient[]>(`${API_INGREDIENTS_URL}/ingredients`);
  }
}
