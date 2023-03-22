import { apiPizzas } from './api/api-pizzas.models';
import { ApiPizzasService } from './api/api-pizzas.service';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { apiTransformPizzas } from './api-pizzas-transform.model';

@Injectable({
  providedIn: 'root'
})
export class ApiTransformPizzasService {

  constructor( 
    private apiPizzasService: ApiPizzasService) { }

  //Funcion que transforma los datos en bruto del GET al api
  public getPizzas(): Observable<apiTransformPizzas[]>{
    return this.apiPizzasService.getApiPizzas().pipe(
      map((pizzas: apiPizzas[]) => {
        return pizzas.map((pizza) => {
          delete pizza.createdAt, pizza.updatedAt;
            return pizza;
        });
      })
    );
  }
  //Funcion que transforma los datos en bruto para el DELETE al api
  public deletePizzas(id: string): Observable<apiTransformPizzas> {
    return this.apiPizzasService.deleteApiPizzas(id).pipe(
      map((pizza) => {
        delete pizza.createdAt, pizza.updatedAt;
            return pizza;
      })
    );
  }
  //Funcion que transforma los datos en bruto para el POST al api
  public createPizzas(body: apiTransformPizzas): Observable<apiTransformPizzas> {
    return this.apiPizzasService.createApiPizzas(body).pipe(
      map((pizza) => {
        delete pizza.createdAt, pizza.updatedAt;
            return pizza;
      })
    );
  }
  //Funcion que transforma los datos en bruto para el PUT al api
  public editPizzas(id: string, body: apiTransformPizzas): Observable<apiTransformPizzas> {
    return this.apiPizzasService.editApiPizzas(id, body).pipe(
      map((pizza) => {
        delete pizza.createdAt, pizza.updatedAt;
            return pizza;
      })
    );
  }
}
