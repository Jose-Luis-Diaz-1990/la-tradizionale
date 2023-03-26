import { Pizza } from '../../services/pizzaCart/pizza-cart-transform.models';
import { Component } from '@angular/core';
import { PizzaCartService } from 'src/app/core/services/pizzaCart/pizza-cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  public myCart:Pizza[]=[];
  myCart$ = this.pizzaCartService.myCart$;

  constructor(private pizzaCartService: PizzaCartService ){       
      let info=localStorage.getItem("carrito");
      if (info){    
        info=info.replace('\"', '"');
        this.myCart=JSON.parse(info)
        this.pizzaCartService.myCart.next(JSON.parse(info));
     }      
  }

  public totalProduct(price: number, account: number){
    return price * account
  }

  public deleteProduct(id:string, size:string){   
    this.pizzaCartService.deleteProduct(id,size);
  }

  // Actualizar Unidades.
  public updateUnits(operation:string, id:string,size:string){   
     const pizza = this.pizzaCartService.findProductById(id);
    if(pizza){  
      if(operation === 'minus' && pizza.account > 0) {
        this.pizzaCartService.updateProduct(id,-1,size);
      } // Sumar
      if(operation === 'add') {
        this.pizzaCartService.updateProduct(id,1,size);
      } // Si llegamos a cero.
      if(pizza.account === 0) {
        this.deleteProduct(id, size);
      }
    }
  }
  
  // Calcular el total.
  public totalCart(){
    const result = this.pizzaCartService.totalCart();
    return result;
  }
}



/*  public carrito?:[pedido];

  public constructor(private msg:MessageService){   
    this.msg.getObservable().subscribe((value)=> 
        {
          debugger;
          if (value)          
            { let info=localStorage.getItem("carrito");
              if (info) {
                info=info.replace('\"', '"');
                this.carrito=JSON.parse(info)
              }   
            }          
        }
    )
  }*/
