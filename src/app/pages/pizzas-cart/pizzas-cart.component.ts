import { Component, OnInit } from '@angular/core';
import { Pizza } from 'src/app/core/services/pizzaCart/pizza-cart-transform.models';
import { PizzaCartService } from 'src/app/core/services/pizzaCart/pizza-cart.service';

@Component({
  selector: 'app-pizzas-cart',
  templateUrl: './pizzas-cart.component.html',
  styleUrls: ['./pizzas-cart.component.scss']
})
export class PizzasCartComponent implements OnInit{
    public pizza: Pizza[] = [];

  constructor(
    private pizzaService: PizzaCartService
  ) {}

  public ngOnInit(): void { 
    this.pizzaService.getPizzas().subscribe((pizza: Pizza[])=> {
      this.pizza = pizza;
    });
  }
  addToCart( pizza: Pizza){
    debugger;
    return this.pizzaService.addPizzas(pizza);
  }
}
