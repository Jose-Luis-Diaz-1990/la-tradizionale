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
    public cantidadPizzas = 0;

  constructor(
    private pizzaService: PizzaCartService,

  ) {}

  public ngOnInit(): void { 
    this.pizzaService.getPizzas().subscribe((pizza: Pizza[])=> {
      this.pizza = pizza;
    });
  }
  addToCart(pizza: Pizza){
    this.cantidadPizzas++; // Incrementar la variable antes de devolver la pizza
    return this.pizzaService.addPizzas(pizza);
  }
  

  public pagina: number = 0;

  public prevPage(){
    if(this.pagina > 0){
      this.pagina -= 4;
    }
  }

  public nextPage(){
    if (this.pagina < 80) {
      this.pagina += 4 ;
    }
  }

  
}
