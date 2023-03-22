import { apiTransformPizzas } from './../../core/services/pizzas/api-pizzas-transform.model';
import { Component } from '@angular/core';
import { ApiTransformPizzasService } from 'src/app/core/services/pizzas/api-pizzas-transform.service';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.scss']
})
export class PizzasComponent {
//Creo un array donde me traigo los ingradientes del api para pintarlos
public pizza: apiTransformPizzas[] = [];

constructor(
  private pizzasService: ApiTransformPizzasService
) {}

 //Al inicio pido las pizzas para pintarlos con un bucle
 public ngOnInit(): void {
  this.pizzasService
    .getPizzas()
    .subscribe((pizzasTransformFromApi: apiTransformPizzas[]) => {
      this.pizza = pizzasTransformFromApi;
    });
}
}
