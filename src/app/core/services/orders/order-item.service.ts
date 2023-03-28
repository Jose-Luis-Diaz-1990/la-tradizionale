import { ApiOrder } from './api/api-orders.models';
import { Injectable } from '@angular/core';
import { map, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Order } from './orders.transform.models';
import { ApiOrdersService } from './api/api-orders.service';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {

constructor(
  private apiOrderService : ApiOrdersService
){}


public createOrder(order: Order): Observable<Order> {
  
  return this.apiOrderService.createApiOrder(order).pipe(
    map((pizza) => {
          return pizza;
    })
  );
}
}
  
