import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PizzasRoutingModule } from './pizzas-routing.module';
import { PizzasComponent } from './pizzas.component';


@NgModule({
  declarations: [
    PizzasComponent
  ],
  imports: [
    CommonModule,
    PizzasRoutingModule
  ]
})
export class PizzasModule { }
