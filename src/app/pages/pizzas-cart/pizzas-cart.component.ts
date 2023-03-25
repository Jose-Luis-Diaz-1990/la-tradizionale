import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Pizza } from 'src/app/core/services/pizzaCart/pizza-cart-transform.models';
import { PizzaCartService } from 'src/app/core/services/pizzaCart/pizza-cart.service';

@Component({
  selector: 'app-pizzas-cart',
  templateUrl: './pizzas-cart.component.html',
  styleUrls: ['./pizzas-cart.component.scss']
})
export class PizzasCartComponent implements OnInit{
    public pizza?: Pizza[] = [];

    public pizzaForm?: FormGroup;

  constructor(
    private pizzaService: PizzaCartService,
    private fb: FormBuilder
  ) {}

  public ngOnInit(): void { 
    this.pizzaService.getPizzas().subscribe((pizza: Pizza[])=> {
      this.pizza = pizza;
    });
  }


  public createFormPizza() {
    this.pizzaForm = this.fb.group({
      size: new FormControl(''),
    });
  
  }  
  
  onSectionChange(value?: any) {
    //TO DO ...
}

public createNewPizza() {
  console.log(this.pizzaForm);
}

  addToCart( pizza: Pizza){
    debugger;
    return this.pizzaService.addPizzas(pizza);
  }
}