import { Pizza } from './../../core/services/pizzaCart/pizza-cart-transform.models';
import { Component } from '@angular/core';
import { PizzaCartService } from 'src/app/core/services/pizzaCart/pizza-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  myCart$ = this.pizzaCartService.myCart$;

  constructor(private pizzaCartService: PizzaCartService ){

  }

  totalProduct(price: number, account: number){
    return price * account
  }

  deleteProduct(id:string){
    this.pizzaCartService.deleteProduct(id);
  }

  // Actualizar Unidades.
  updateUnits(operation:string, id:string){
    // Buscamos por id.
    const pizza = this.pizzaCartService.findProductById(id);
    if(pizza){
      // Restar
      if(operation === 'minus' && pizza.account > 0) {
        pizza.account = pizza.account -1;
      } // Sumar
      if(operation === 'add') {
        pizza.account = pizza.account +1;
      } // Si llegamos a cero.
      if(pizza.account === 0) {
        this.deleteProduct(id);
      }
    }
  }
  
  // Calcular el total.
  totalCart(){
    const result = this.pizzaCartService.totalCart();
    return result;
  }
}
