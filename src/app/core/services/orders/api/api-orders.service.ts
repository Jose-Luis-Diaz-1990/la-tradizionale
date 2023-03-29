import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiOrder } from './api-orders.models';
import { Order } from '../orders.transform.models';


const API_PIZZA_URL='https://back-pizza.vercel.app';

@Injectable({
  providedIn: 'root'
})
export class ApiOrdersService {

  constructor( private http: HttpClient) { }

  //Get para recuperar las order del api
  public getApiOrder(): Observable<ApiOrder[]>{
    return this.http.get<ApiOrder[]>(`${API_PIZZA_URL}/order`);
  }
  //Delete pasando el id para eliminar una pizza
  public deleteApiOrder(id: string): Observable<ApiOrder>{
    return this.http.delete<ApiOrder>(`${API_PIZZA_URL}/order/${id}`);
  }
  //post para crear una nueva pizza pasando el body con schcema de la interface transformada
  public createApiOrder(order: Order): Observable<ApiOrder> {
    console.log(order);
    return this.http.post<ApiOrder>(`${API_PIZZA_URL}/order/pizzas`, order);
  }
  //put para actualizar una de las pizas donde paso su id y el body con el schema de la interface
  public editApiOrder(id: string, body: Order) {
    return this.http.put<ApiOrder>(`${API_PIZZA_URL}/order/${id}`, body);
  }
}
