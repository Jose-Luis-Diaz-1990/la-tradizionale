import { PizzasCartComponent } from './pizzas-cart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PizzasCartRoutingModule } from './pizzas-cart-routing.module';


@NgModule({
  declarations: [
    PizzasCartComponent
  ],
  imports: [
    CommonModule,
    PizzasCartRoutingModule
  ]
})
export class PizzasCartModule { }
