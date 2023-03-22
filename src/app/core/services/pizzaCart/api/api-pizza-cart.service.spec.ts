import { TestBed } from '@angular/core/testing';
import { Pizza} from '../pizza-cart-transform.models.js'
import { ApiPizzaCartService } from './api-pizza-cart.service';

describe('ApiPizzaCartService', () => {
  let service: ApiPizzaCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPizzaCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
