import { FooterComponent } from './components/footer/footer.component';
import { LoadingComponent } from './components/loading/loading.component'
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './components/cart/cart.component';


@NgModule({
  declarations: [
    HeaderComponent,
    LoadingComponent,
    FooterComponent,
    CartComponent    
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],

  exports: [
    HeaderComponent,
    FooterComponent,
    LoadingComponent
  ]
})
export class 
CoreModule { }
