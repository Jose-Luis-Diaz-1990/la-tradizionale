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
import { PizzaCartService } from 'src/app/core/services/pizzaCart/pizza-cart.service';
import { Pizza } from 'src/app/core/services/pizzaCart/pizza-cart-transform.models';

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
  public toppings: string[] = [];

  public createdPizza?: Pizza;

  public massRe = '';


  constructor(
    private fb: FormBuilder,
    private ingredientsService: ApiTransformIngredientsService,
    private pizzaService: PizzaCartService
  ) {this.createFormPizza()}
  //Al inicio pido los ingrdientes para pintarlos con un bucle y llamo a la función de crear el formulario
  public ngOnInit(): void {
    this.ingredientsService
      .getIngredients()
      .subscribe((ingredientsTransformFromApi: apiTransformIngredients[]) => {
        this.ingredient = ingredientsTransformFromApi;
        this.createFormPizza();
      });

      this.pizzaForm?.get('mass')?.valueChanges.subscribe((value) =>{
        if (!value) { return; }
        this.massRe = value;
      });
      // this.sportForm?.get('image')?.valueChanges.subscribe((value) => {
      //   if (!value) { return; }
      //   this.imageBi = value;
      // });
      //  this.sportForm?.get('description')?.valueChanges.subscribe((value) =>{
      //   if (!value) { return; }
      //   this.descriptionBi = value;
      // });
      //  this.sportForm?.get('equipment')?.valueChanges.subscribe((value) =>{
      //   if (!value) { return; }
      //   this.equipmentBi = value;
      // });
      //  this.sportForm?.get('author')?.valueChanges.subscribe((value) =>{
      //   if (!value) { return; }
      //   this.authorBi = value;
      // });
  }

  //Creo la lógica para el formulario y las validaciones de los campos
  public createFormPizza() {
    this.pizzaForm = this.fb.group({
      name: new FormControl('Pizza al gusto', [Validators.requiredTrue]),
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
      } 
      else {
        const i = toppings.controls.findIndex((x) => x.value === topping);
        toppings.removeAt(i);
      }
      this.toppings = [];
      this.toppings.push(toppings.value);
    }
  }

  //Función que se ejecuta con el submit del formulario
  public createNewPizza() {
    const pizzaAlGusto = this.pizzaForm?.value;
    if (pizzaAlGusto) {
      pizzaAlGusto.pricebase = 10;
      pizzaAlGusto.price = 10;
      pizzaAlGusto.account = 1;
      pizzaAlGusto.picture = 'https://es.italy24.press/content/uploads/2023/03/11/29e81ed8c3.jpg';
    }
    console.log(pizzaAlGusto);
    
    this.pizzaService.createPizzas(pizzaAlGusto).subscribe((p:Pizza)=>
       {
        this.createdPizza=p;
        this.pizzaService.addPizzas(p)})
  }

}
