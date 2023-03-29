import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Pizza } from 'src/app/core/services/pizzaCart/pizza-cart-transform.models';
import { PizzaCartService } from 'src/app/core/services/pizzaCart/pizza-cart.service';
import  sizes  from 'src/app/core/services/pizzaCart/pizza-cart-data';
import { isSelectedSize } from './validators/size.validators';


@Component({
  selector: 'app-pizzas-cart',
  templateUrl: './pizzas-cart.component.html',
  styleUrls: ['./pizzas-cart.component.scss']
})

export class PizzasCartComponent implements OnInit{

    public pizza: Pizza[] = [];
    public pizzaForm?: FormGroup;
    public sizeOptions=sizes;   
    
    
  constructor(
    private pizzaService: PizzaCartService,
    private fb: FormBuilder)
     {
      this.pizzaForm = this.fb.group({
        size: new FormControl('selecciona',[isSelectedSize()]),
      });
     }

  public ngOnInit(): void {     
    this.pizzaService.getPizzas().subscribe((pizza: Pizza[])=> {
      this.pizza = pizza.filter(p => !p.name.includes('gusto'));
    });
  }
  
public addToCart( pizza: Pizza){  
  alert('La pizza ha sido añadida al carrito'); 
    debugger;   
    pizza.size=this.pizzaForm?.get("size")?.value;
    this.pizzaForm?.patchValue({
      size: "selecciona",      
    })
    if (pizza.size=="mediana") 
    {
      pizza.price=Number((pizza.pricebase*1.10).toFixed(2));
    }
    else if (pizza.size=="familiar")
    {
      pizza.price=Number((pizza.pricebase*1.15).toFixed(2));
    }
    else if (pizza.size=="pequeña")
    {
      pizza.price=Number((pizza.pricebase).toFixed(2));
    }
    return this.pizzaService.addPizzas(pizza);
  }


  public pizzasCount(){
    const pizzaCount = this.pizzaService.pizzasCount();
    return pizzaCount;
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