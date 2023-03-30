
import { PizzaCartService } from './../../services/pizzaCart/pizza-cart.service';
import { Pizza } from './../../services/pizzaCart/pizza-cart-transform.models';

import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  {
  public cantidadPizzas: number = 0;
  public isLogged: boolean = false;
  public showMenu: boolean = false;


  cartIsClosed = false;

   // Para mostrar el carrito segun tenga elementos.
   public viewCart: boolean = false;

  constructor(
    private router: Router,
    private auth:AuthService,
    private pizzaCartService: PizzaCartService
 
  ) {}

  //Ruta que lleva a la página de not-found, se accede a ella cuando la url no existe.
  public navigateToNotFound() {
    this.router.navigate(['no-existe']);
  }
   
  public toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  //Nos suscribimos al observable que nos determina si el usuario está o no conectado.
  public ngOnInit(): void {  
    this.auth.userLogged$.subscribe((isLogged) => this.isLogged = isLogged);
  }
  
  //Cerramos la sesión del usuario usando el método logout del servicio auth
  public cerrarSesion():void{
    this.auth.logout();
  }

  onToggleCart(){
    this.viewCart = !this.viewCart
  }



  //*
  public pizzasCount(){
    const pizzaCount = this.pizzaCartService.pizzasCount();
    return pizzaCount;
  }

  public goToHome(){
    this.router.navigate(['home'])
    location.reload(); // Recargar la página
  }


  }