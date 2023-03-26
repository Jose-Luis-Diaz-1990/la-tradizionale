import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './components/cart/cart.component';


@NgModule({
  declarations: [
    HeaderComponent,
    CartComponent    
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],

  exports: [
    HeaderComponent
  ]
})
export class 
CoreModule { }
