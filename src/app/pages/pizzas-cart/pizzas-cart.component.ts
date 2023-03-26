import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Pizza } from 'src/app/core/services/pizzaCart/pizza-cart-transform.models';
import { PizzaCartService } from 'src/app/core/services/pizzaCart/pizza-cart.service';
import  sizes  from 'src/app/core/services/pizzaCart/pizza-cart-data';


@Component({
  selector: 'app-pizzas-cart',
  templateUrl: './pizzas-cart.component.html',
  styleUrls: ['./pizzas-cart.component.scss']
})

export class PizzasCartComponent implements OnInit{

    public pizza: Pizza[] = [];
    public pizzaForm?: FormGroup;
    public sizeOptions=sizes;  
    public cantidadPizzas = 0;

    
  constructor(
    private pizzaService: PizzaCartService,
    private fb: FormBuilder)
     {
      this.pizzaForm = this.fb.group({
        size: new FormControl('pequeña'),
      });
     }

  public ngOnInit(): void {     
    this.pizzaService.getPizzas().subscribe((pizza: Pizza[])=> {
      this.pizza = pizza;
    });
  }
  
public addToCart( pizza: Pizza){
this.cantidadPizzas++;
    pizza.size=this.pizzaForm?.get("size")?.value;
    if (pizza.size=="mediana") 
    {
      pizza.price=pizza.price*1.10;
    }
    else if (pizza.size=="familiar")
    {
      pizza.price=pizza.price*1.15;
    }


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
