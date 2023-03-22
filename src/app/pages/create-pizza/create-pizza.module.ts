import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatePizzaRoutingModule } from './create-pizza-routing.module';
import { CreatePizzaComponent } from './create-pizza.component';



@NgModule({
  declarations: [
    CreatePizzaComponent,
  ],
  imports: [
    CommonModule,
    CreatePizzaRoutingModule,
    ReactiveFormsModule
  ]
})
export class CreatePizzaModule { }
