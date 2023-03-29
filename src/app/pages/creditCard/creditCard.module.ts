import { CreditCardRoutingModule } from './creditCard-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditCardComponent } from './creditCard.component';


@NgModule({
  declarations: [
    CreditCardComponent
  ],
  imports: [
    CommonModule,
    CreditCardRoutingModule
  ]
})
export class CreditCardModule { }
