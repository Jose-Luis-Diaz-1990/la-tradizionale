import { ApiTransformIngredientsService } from './../../core/services/ingredients/api-transform-ingredients.service';
import { apiTransformIngredients } from './../../core/services/ingredients/api-transform-ingredients.models';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-pizza',
  templateUrl: './create-pizza.component.html',
  styleUrls: ['./create-pizza.component.scss'],
})
export class CreatePizzaComponent implements OnInit {
  //Creo una variable donde guardo el formulario y le aplico el tipo FormGroup
  public pizzaForm?: FormGroup;
  //Creo un array donde me traigo los ingradientes del api para pintarlos
  public ingredient: apiTransformIngredients[] = [];
  //Creo un array donde voy a introducir los ingredientes seleccionados en el checkbox
  public toppings = [];
  
  constructor(
    private fb: FormBuilder,
    private ingredientsService: ApiTransformIngredientsService
  ) {}
  //Al inicio pido los ingrdientes para pintarlos con un bucle
  public ngOnInit(): void {
    this.ingredientsService
      .getIngredients()
      .subscribe((ingredientsTransformFromApi: apiTransformIngredients[]) => {
        this.ingredient = ingredientsTransformFromApi;
        this.createFormPizza();
      });
  }

  //Creo la lógica para el formulario y las validaciones de los campos
  public createFormPizza() {
    this.pizzaForm = this.fb.group({
      name: new FormControl('', [Validators.requiredTrue]),
      mass: new FormControl('', [Validators.requiredTrue]),
      size: new FormControl('', [Validators.requiredTrue]),
      dip: new FormControl('', [Validators.requiredTrue]),
      ingredients: new FormArray([]),
    });
  }
  //Creo la lógica para añadir y eliminar los topping del array toppings y lo vinculo con el ingredients FormArray
  onCheckboxChange(event: any, topping: string) {
    if (this.pizzaForm) {
      const toppings = this.pizzaForm.get('ingredients') as FormArray;
      if (event.target.checked) {
        toppings.push(new FormControl(topping));
      } else {
        const i = toppings.controls.findIndex((x) => x.value === topping);
        toppings.removeAt(i);
      }
    }
  }

  public createNewPizza() {
    console.log(this.pizzaForm);
  }
}
