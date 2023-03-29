import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiCustomerOrder } from './api-customer-order.models';
import { CustomerOrder } from '../customer-order.models';

const API_PIZZA_URL='http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ApiCustomerOrderService {

  constructor(
    private http: HttpClient
  ) { }

  public getApiCustomerOrder(): Observable<ApiCustomerOrder[]>{
    return this.http.get<ApiCustomerOrder[]>(`${API_PIZZA_URL}/customer`);
  }

  public deleteApiCustomerOrder(id: string): Observable<ApiCustomerOrder>{
    return this.http.delete<ApiCustomerOrder>(`${API_PIZZA_URL}/customer/${id}`);
  }

  public createApiCustomerOrder(body: CustomerOrder) {
    console.log(body);
    
    return this.http.post<ApiCustomerOrder>(`${API_PIZZA_URL}/customer-order`, body);
  }
}
