import { Router } from '@angular/router';

import { Component, OnInit, ElementRef } from '@angular/core';
import { TouchEventHandlerService } from 'src/app/core/services/touch-event-handler.service';


@Component({
  selector: 'app-creditCard',
  templateUrl: './creditCard.component.html',
  styleUrls: ['./creditCard.component.scss']
})
export class CreditCardComponent {


  public pago() { 
        alert('Pago realizado con éxito');
        location.reload(); // Recargar la página
  }


 
}

