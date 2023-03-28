import { LoadingService } from './../loading/loading.service';
import { apiPizza } from './api/api-pizza-cart.models';
import { Pizza } from './pizza-cart-transform.models';
import { Injectable } from '@angular/core';
import { map, Observable, BehaviorSubject, tap, Subject} from 'rxjs';
import { ApiPizzaCartService } from './api/api-pizza-cart.service';

@Injectable({
  providedIn: 'root'
})
export class PizzaCartService {

// lista de carrito.
mylist:Pizza[]=[];
// Carrito observable.
myCart = new BehaviorSubject<Pizza[]>([]);
// Le indicamos el valor que va a guardar.
myCart$ = this.myCart.asObservable();

private pizzasIds = new Subject<string>()

constructor( 
  private apiPizzaService: ApiPizzaCartService,
  private loadingService: LoadingService) {
    const curChart = this.getOrders();
    if (curChart){
      this.mylist=curChart
    }
   }

getPizzaIds() {
  return this.pizzasIds.asObservable();
}   

//Funcion que transforma los datos en bruto del GET al api
public getPizzas(): Observable<Pizza[]>{
  this.loadingService.showLoading();
  return this.apiPizzaService.getApiPizzas().pipe(
    map((pizzas: apiPizza[]) => {
      return pizzas.map((pizza) => {
        delete pizza.createdAt, pizza.updatedAt;
          return pizza;
      });
    }),
    tap(() => this.loadingService.hideLoading())
  );
}

public getOrders():Pizza[]{
  const carrito= localStorage.getItem("carrito");
  if (carrito) {return JSON.parse(carrito)}
  return [];
}

public setOrders(value:Pizza[]){
  localStorage.setItem("carrito",JSON.stringify(value));  
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
public addPizzas(pizza: Pizza){   
     this.mylist=this.getOrders();
    if (this.mylist.length === 0) {
      pizza.account;
      this.mylist.push(pizza);      
      this.myCart.next(this.mylist);
      localStorage.setItem("carrito",JSON.stringify(this.mylist)); 
    }else{
      const productMod = this.mylist.find((element)=> {             
        return ((element._id === pizza._id) && (element.size===pizza.size))
      })
      if(productMod){
        productMod.account = productMod.account +1;
        this.myCart.next(this.mylist);
        localStorage.setItem("carrito",JSON.stringify(this.mylist)); 
      } else{
        pizza.account;
        this.mylist.push(pizza);
        this.myCart.next(this.mylist);
        localStorage.setItem("carrito",JSON.stringify(this.mylist)); 
      }
       this.myCart.next(this.mylist);
        this.pizzasIds.next(pizza._id)  
    } 
  } 
  
public deleteProduct(id: string, size:string){    
    this.mylist = this.mylist.filter((pizza) => {      
      return ((pizza._id != id) || (pizza._id==id && pizza.size!=size));
      })
    this.myCart.next(this.mylist);
    this.setOrders(this.mylist);

  }

public updateProduct(id: string, x:number, size:string){  
  const position=this.mylist.findIndex((e)=> e._id==id && e.size==size);
  if (x===-1 && this.mylist[position].account ==1)
    {this.deleteProduct(id,size)}
  else {
    this.mylist[position].account=this.mylist[position].account + x;
    this.myCart.next(this.mylist);
    this.setOrders(this.mylist);
    }
  }
  // Buscar por id.
public findProductById(id: string) {
    // Buscamos el id en nuestra lista de carrito.
    return this.mylist.find((element) => {
      // Tiene que coincidir con id de la lista.
      return element._id === id;
    })
  }

  // Calcular el total con un reduce.
public totalCart(){
    const total = this.mylist.reduce(function(acc, pizza){ return acc + (pizza.account * pizza.price);}, 0);
    return total;
  }



//Esta función
public pizzasCount(){
  const pizzaCount = this.mylist.length;
  return pizzaCount;
}


}
