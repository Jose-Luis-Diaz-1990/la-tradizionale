import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiPizza } from './api-pizza-cart.models';
import { Pizza} from '../pizza-cart-transform.models'

const API_PIZZA_URL='https://back-pizza.vercel.app';

@Injectable({
  providedIn: 'root'
})
export class ApiPizzaCartService {

  constructor( private http: HttpClient) { }

  //Get para recuperar las pizzas del api
  public getApiPizzas(): Observable<apiPizza[]>{
    return this.http.get<apiPizza[]>(`${API_PIZZA_URL}/pizzas`);
  }
  //Delete pasando el id para eliminar una pizza
  public deleteApiPizzas(id: string): Observable<apiPizza>{
    return this.http.delete<apiPizza>(`${API_PIZZA_URL}/pizzas/${id}`);
  }
  //post para crear una nueva pizza pasando el body con schcema de la interface transformada
  public createApiPizzas(body: Pizza) {
    return this.http.post<apiPizza>(`${API_PIZZA_URL}/pizzas`, body);
  }
  //put para actualizar una de las pizas donde paso su id y el body con el schema de la interface
  public editApiPizzas(id: string, body: Pizza) {
    return this.http.put<apiPizza>(`${API_PIZZA_URL}/pizzas/${id}`, body);
  }
}
