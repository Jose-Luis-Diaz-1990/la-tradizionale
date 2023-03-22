import { TestBed } from '@angular/core/testing';

import { PizzaCartService } from './pizza-cart.service';

describe('PizzaCartService', () => {
  let service: PizzaCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PizzaCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
