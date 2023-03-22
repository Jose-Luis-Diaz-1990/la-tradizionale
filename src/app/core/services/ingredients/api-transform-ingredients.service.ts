import { apiIngredient } from './api/api-ingradients.models';
import { apiTransformIngredients } from './api-transform-ingredients.models';
import { map, Observable } from 'rxjs';
import { ApiIngredientsService } from './api/api-ingredients.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiTransformIngredientsService {
//Recojo los datos que traigo en bruto del api-ingredients
  constructor( private apiIngredientsService: ApiIngredientsService) { }
  //Transfromo los datos y los sirvo con esta funcion que se vincula con el get que trae los datos en bruto del api.
  public getIngredients(): Observable<apiTransformIngredients[]> {
    return this.apiIngredientsService.getApiIngredients().pipe(
      map((ingredients: apiIngredient[]) => {
          return ingredients.map((ingredient: apiIngredient) => {
            delete ingredient.createdAt, ingredient.updatedAt;
            return ingredient;
          });
      })
    );
  }
}
