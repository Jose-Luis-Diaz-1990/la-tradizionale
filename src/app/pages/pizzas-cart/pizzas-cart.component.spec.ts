import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzasCartComponent } from './pizzas-cart.component';

describe('PizzasCartComponent', () => {
  let component: PizzasCartComponent;
  let fixture: ComponentFixture<PizzasCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PizzasCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzasCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
