import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiTransformPizzas } from '../api-pizzas-transform.model';
import { apiPizzas } from './api-pizzas.models';

const API_PIZZA_URL='https://back-pizza.vercel.app';

@Injectable({
  providedIn: 'root'
})
export class ApiPizzasService {

  constructor( private http: HttpClient) { }

  //Get para recuperar las pizzas del api
  public getApiPizzas(): Observable<apiPizzas[]>{
    return this.http.get<apiPizzas[]>(`${API_PIZZA_URL}/pizzas`);
  }
  //Delete pasando el id para eliminar una pizza
  public deleteApiPizzas(id: string): Observable<apiPizzas>{
    return this.http.delete<apiPizzas>(`${API_PIZZA_URL}/pizzas/${id}`);
  }
  //post para crear una nueva pizza pasando el body con schcema de la interface transformada
  public createApiPizzas(body: apiTransformPizzas) {
    return this.http.post<apiPizzas>(`${API_PIZZA_URL}/pizzas`, body);
  }
  //put para actualizar una de las pizas donde paso su id y el body con el schema de la interface
  public editApiPizzas(id: string, body: apiTransformPizzas) {
    return this.http.put<apiPizzas>(`${API_PIZZA_URL}/pizzas/${id}`, body);
  }
}
