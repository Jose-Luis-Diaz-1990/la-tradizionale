import { apiPizza } from './api/api-pizza-cart.models';
import { Pizza } from './pizza-cart-transform.models';
import { Injectable } from '@angular/core';
import { map, Observable, BehaviorSubject } from 'rxjs';
import { ApiPizzaCartService } from './api/api-pizza-cart.service';

@Injectable({
  providedIn: 'root'
})
export class PizzaCartService {

// lista de carrito.
private mylist:Pizza[]=[];
// Carrito observable.
private myCart = new BehaviorSubject<Pizza[]>([]);
// Le indicamos el valor que va a guardar.
myCart$ = this.myCart.asObservable();

constructor( 
  private apiPizzaService: ApiPizzaCartService) { }

//Funcion que transforma los datos en bruto del GET al api
public getPizzas(): Observable<Pizza[]>{
  return this.apiPizzaService.getApiPizzas().pipe(
    map((pizzas: apiPizza[]) => {
      return pizzas.map((pizza) => {
        delete pizza.createdAt, pizza.updatedAt;
          return pizza;
      });
    })
  );
}
//Funcion que transforma los datos en bruto para el DELETE al api
public deletePizzas(id: string): Observable<Pizza> {
  return this.apiPizzaService.deleteApiPizzas(id).pipe(
    map((pizza) => {
      delete pizza.createdAt, pizza.updatedAt;
          return pizza;
    })
  );
}
//Funcion que transforma los datos en bruto para el POST al api
public createPizzas(body: Pizza): Observable<Pizza> {
  return this.apiPizzaService.createApiPizzas(body).pipe(
    map((pizza) => {
      delete pizza.createdAt, pizza.updatedAt;
          return pizza;
    })
  );
}
//Funcion que transforma los datos en bruto para el PUT al api
public editPizzas(id: string, body: Pizza): Observable<Pizza> {
  return this.apiPizzaService.editApiPizzas(id, body).pipe(
    map((pizza) => {
      delete pizza.createdAt, pizza.updatedAt;
          return pizza;
    })
  );
}

// funcion para añadir a el carrito.
// Añado tres casuisticas si esta vacia añado producto, si no esta vacia comparo si existe, si existe modifico la account y si existe lo añado.
  addPizzas(pizza: Pizza){
      
    if(this.mylist.length === 0) {
      pizza.account;
      this.mylist.push(pizza);
      this.myCart.next(this.mylist);
    }else{
      const productMod = this.mylist.find((element)=> {
        console.log(element._id === pizza._id);
        
        return element._id === pizza._id         
      })
      if(productMod){
        productMod.account = productMod.account +1;
        this.myCart.next(this.mylist);
      } else{
        pizza.account;
        this.mylist.push(pizza);
        this.myCart.next(this.mylist);
      }
    } 
  } 

  
  deleteProduct(id: string){
    this.mylist = this.mylist.filter((pizza) => {
      return pizza._id != id
    })
    this.myCart.next(this.mylist);
  }
  // Buscar por id.
  findProductById(id: string) {
    // Buscamos el id en nuestra lista de carrito.
    return this.mylist.find((element) => {
      // Tiene que coincidir con id de la lista.
      return element._id === id;
    })
  }

  // Calcular el total con un reduce.
  totalCart(){
    const total = this.mylist.reduce(function(acc, pizza){ return acc + (pizza.account * pizza.price);}, 0);
    return total;
  }
}
