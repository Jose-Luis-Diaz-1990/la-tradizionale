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
  public toppings: any[] = [];
  //Creo un array donde voy a introducir los datos de mi pizza
  public pizzaObjet: any[] = [];
  //Uso una variable con valor 1 para tener siempre cantidad igual a 1
  public quantity: number = 1;
  //Uso la variable para guardar el tamaño seleccionado por el usuario
  public sizeObject: string = '';
  //Uso la variable para definir el precio en función del tamaño
  public priceObject: number = 10;

  public item: any[] = [];


  constructor(
    private fb: FormBuilder,
    private ingredientsService: ApiTransformIngredientsService,
    private pizzaService: PizzaCartService
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
    //Recojo en una variable los valores del formulario
    const myCopyPizza = this.pizzaForm;
    //Asigno la talla de la pizza a la variable que compone el item
    this.sizeObject = myCopyPizza?.value.size;
    //Uso los valores que necesita el objeto pizza en el array de items y los meto en un array.
    if(this.pizzaObjet){
        this.pizzaObjet.push(myCopyPizza?.value.name);
        this.pizzaObjet.push(myCopyPizza?.value.mass);
        this.pizzaObjet.push(myCopyPizza?.value.dip);
        this.pizzaObjet.push(this.toppings);
      }
    //Incremento el precio si el tamaño es mayor que pequeño
    if(this.sizeObject === "mediana"){
        this.priceObject = this.priceObject * 1.10;
    }
    if(this.sizeObject === "familiar"){
      this.priceObject = this.priceObject * 1.15;
    }

    //Contruyo el array items que le va a llegar al carrito
    if(this.pizzaObjet && this.quantity && this.sizeObject && this.priceObject && this.toppings){
      this.item.push(this.pizzaObjet);
      this.item.push(this.quantity);
      this.item.push(this.sizeObject);
      this.item.push(this.priceObject);
    }
    console.log(this.item); 
    this.addToCart(this.pizzaObjet);
  }

  addToCart( pizzaObjet: any){
    return this.pizzaService.addPizzas(pizzaObjet);
  }
}
