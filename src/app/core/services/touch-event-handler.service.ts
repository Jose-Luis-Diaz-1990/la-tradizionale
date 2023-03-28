import { Pizza } from './pizzaCart/pizza-cart-transform.models';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TouchEventHandlerService {
 
  private initialTouch = { clientX: 0, clientY: 0 };
  private finalTouch = { clientX: 0, clientY: 0 };

  //El método "preventDefaultTouchend" es un manejador de eventos que se utiliza para cancelar la propagación de un evento "touchend" y evitar su comportamiento predeterminado si es posible. Si el evento es cancelable y su tipo es "touchend", entonces se llama al método preventDefault() del objeto evento para cancelar su propagación.
  public preventDefaultTouchend(e: Event) {

    if (e.cancelable && e.type === "touchend") {

      e.preventDefault();
    }
  }

  //El método "setInitialTouchPoint" se utiliza para establecer las coordenadas iniciales del punto táctil en la pantalla. Este método toma un evento de tipo TouchEvent como argumento y establece las coordenadas iniciales del punto táctil en las coordenadas x e y del primer elemento cambiado del objeto evento TouchEvent.
  public setInitialTouchPoint(e: TouchEvent) {

    e.stopPropagation();

    this.initialTouch.clientX = e.changedTouches.item(0)?.clientX as number;
    this.initialTouch.clientY = e.changedTouches.item(0)?.clientY as number;
  }

  //El método "itIsAMovingTouch" se utiliza para comprobar si el dedo está moviéndose en la pantalla. Si el evento es de tipo "touchend", se establecen las coordenadas finales del punto táctil en las coordenadas x e y del primer elemento cambiado del objeto evento TouchEvent. A continuación, se compara el objeto "initialTouch" con el objeto "finalTouch" para determinar si el dedo ha sido movido en la pantalla. Si los objetos son diferentes, entonces se devuelve "true", de lo contrario se devuelve "false".
  public itIsAMovingTouch(e: Event): boolean {

    if (e.type === "touchend") {

      this.finalTouch.clientX = (e as TouchEvent).changedTouches.item(0)?.clientX as number;
      this.finalTouch.clientY = (e as TouchEvent).changedTouches.item(0)?.clientY as number;

      if (JSON.stringify(this.finalTouch) !== JSON.stringify(this.initialTouch)) return true;
    }

    return false;
  }


}
