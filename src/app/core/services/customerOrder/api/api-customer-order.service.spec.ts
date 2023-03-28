import { TestBed } from '@angular/core/testing';

import { ApiCustomerOrderService } from './api-customer-order.service';

describe('ApiCustomerOrderService', () => {
  let service: ApiCustomerOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCustomerOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
