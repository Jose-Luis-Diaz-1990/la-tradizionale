import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    //Ruta que lleva al Home
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'pago',
    loadChildren: () => import('./pages/creditCard/creditCard.module').then(m => m.CreditCardModule)
  },
  {
    path: 'create-pizza',
    loadChildren: () => import('./pages/create-pizza/create-pizza.module').then(m => m.CreatePizzaModule)
  },
   {
    path: 'pizzaCart',
    loadChildren: () => import('./pages/pizzas-cart/pizzas-cart.module').then(m => m.PizzasCartModule)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
