import { Injectable } from '@angular/core';
import { map, Observable, BehaviorSubject } from 'rxjs';
import { ApiCustomerOrderService } from './api/api-customer-order.service';
import { CustomerOrder } from './customer-order.models';

@Injectable({
  providedIn: 'root'
})
export class CustomerOrderService {

  constructor(
    private apiCustomerOrderService : ApiCustomerOrderService
  ) { }

  public createCustomerOrder(customerOrder: CustomerOrder): Observable<CustomerOrder> {
    return this.apiCustomerOrderService.createApiCustomerOrder(customerOrder).pipe(
      map((customerOrder) => {
            return customerOrder;
      })
    );
  }
}
