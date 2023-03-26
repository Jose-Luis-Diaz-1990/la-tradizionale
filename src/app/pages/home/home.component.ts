import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { TouchEventHandlerService } from 'src/app/core/services/touch-event-handler.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  //currentSlide es una variable que almacena el número de la diapositiva actual. Comienza en 1.
  private currentSlide = 1;
  //intervalId es una variable que almacena el ID del intervalo de tiempo que se usa para avanzar automáticamente las diapositivas.
  public intervalId!: number;
  //pausedSlides es una variable que indica si las diapositivas están actualmente en pausa o no.
  public pausedSlides = false;

  constructor(private touchEventHandlerService: TouchEventHandlerService,
    private router: Router) { }

  public goToPizzas(){
    this.router.navigate(['pizzaCart'])
  }

  //viewSlide es un método privado que cambia la diapositiva actual para que coincida con la diapositiva especificada. Recibe el número de la diapositiva como argumento y usa el método getElementById de JavaScript para encontrar el botón de radio correspondiente y establecer su propiedad checked en true.
  private viewSlide(slideNumber: number) {

    let slideButton = document.getElementById("slide-" + slideNumber) as HTMLInputElement;
    slideButton.checked = true
  }

  //automaticSlideAdvance es un método privado que configura un intervalo de tiempo para avanzar automáticamente las diapositivas. Usa el método setInterval de JavaScript para ejecutar una función que incrementa currentSlide en 1 cada 5 segundos, y luego llama a viewSlide para mostrar la nueva diapositiva.
  private automaticSlideAdvance() {

    this.intervalId = window.setInterval(() => {

      if (this.currentSlide <= 3) {

        ++this.currentSlide;
      } else {

        this.currentSlide = 1
      }

      this.viewSlide(this.currentSlide);
    }, 5000);
  }

  ngOnInit(): void {

    this.automaticSlideAdvance();
  }

  //stopAutomaticSlideAdvance es un método público que detiene la presentación automática de diapositivas. Recibe un evento como argumento y lo usa para llamar a stopPropagation y preventDefault para evitar que el evento se propague y detener cualquier comportamiento predeterminado que pueda tener el navegador. Luego llama a clearInterval para detener el intervalo de tiempo que se usa para avanzar automáticamente las diapositivas y establece pausedSlides en true.
  public stopAutomaticSlideAdvance(e: Event) {

    e.stopPropagation();

    this.touchEventHandlerService.preventDefaultTouchend(e);

    if (this.touchEventHandlerService.itIsAMovingTouch(e)) return;

    window.clearInterval(this.intervalId);

    this.pausedSlides = true;
  }

  //resumeAutomaticSlideAdvance es un método público que reanuda la presentación automática de diapositivas después de haber sido detenida. Recibe un evento como argumento y lo usa para llamar a stopPropagation y preventDefault para evitar que el evento se propague y detener cualquier comportamiento predeterminado que pueda tener el navegador. Luego llama a automaticSlideAdvance para reanudar la presentación automática de diapositivas y establece pausedSlides en false.
  public resumeAutomaticSlideAdvance(e: Event) {

    e.stopPropagation();

    this.touchEventHandlerService.preventDefaultTouchend(e);

    if (this.touchEventHandlerService.itIsAMovingTouch(e)) return;

    this.automaticSlideAdvance();

    this.pausedSlides = false;
  }

  //setInitialTouchPoint es un método público que se usa para establecer el punto inicial de contacto en un evento de toque en dispositivos móviles. Recibe un evento TouchEvent como argumento y lo pasa a setInitialTouchPoint del servicio touchEventHandlerService.
  public setInitialTouchPoint(e: TouchEvent) {

    this.touchEventHandlerService.setInitialTouchPoint(e);
  }

  //slideBack es un método público que avanza manualmente una diapositiva hacia atrás. Recibe un evento como argumento y lo usa para llamar a stopPropagation y preventDefault para evitar que el evento se propague y detener cualquier comportamiento predeterminado que pueda tener el navegador. Luego decrementa currentSlide en 1 o establece currentSlide en 4 si currentSlide es 1, y llama a viewSlide para mostrar la nueva diapositiva.
  public slideBack(e: Event) {

    e.stopPropagation();

    this.touchEventHandlerService.preventDefaultTouchend(e);

    if (this.touchEventHandlerService.itIsAMovingTouch(e)) return;

    if (this.currentSlide >= 2) {

      --this.currentSlide;
    } else {

      this.currentSlide = 4;
    }

    this.viewSlide(this.currentSlide);
  }

  //slideAdvance: Esta función se utiliza para avanzar la diapositiva a la siguiente en una presentación de diapositivas. Toma un objeto de evento como argumento y lo usa para realizar algunas comprobaciones y evitar que el evento se propague más. Luego llama al método preventDefaultTouchend(e) de touchEventHandlerService, que evita el comportamiento predeterminado de los eventos de touchend, y verifica si el evento no es un toque en movimiento al llamar al método itIsAMovingTouch(e) de touchEventHandlerService. Si el evento táctil no es un toque en movimiento, verifica si el número de diapositiva actual es menor o igual a 3. Si lo es, incrementa el número de diapositiva actual en 1. De lo contrario, restablece el número de diapositiva actual a 1. Finalmente , llama al método viewSlide() con el número de diapositiva actual actualizado para mostrar la nueva diapositiva.

  public slideAdvance(e: Event) {

    e.stopPropagation();

    this.touchEventHandlerService.preventDefaultTouchend(e);

    if (this.touchEventHandlerService.itIsAMovingTouch(e)) return;

    if (this.currentSlide <= 3) {

      ++this.currentSlide;
    } else {

      this.currentSlide = 1;
    }

    this.viewSlide(this.currentSlide);
  }

  //setSlide:Esta función se utiliza para establecer la diapositiva en un número de diapositiva específico en una presentación de diapositivas. Toma un objeto de evento y un número de diapositiva como argumentos. Utiliza el objeto de evento para realizar algunas comprobaciones y evitar que el evento se propague más. Luego llama al método preventDefaultTouchend(e) de touchEventHandlerService para evitar el comportamiento predeterminado de los eventos de touchend y verifica si el evento no es un toque en movimiento llamando al método itIsAMovingTouch(e) de touchEventHandlerService. Si el evento táctil es un evento táctil, llama al método viewSlide() con el número de diapositiva dado para mostrar esa diapositiva. Finalmente, actualiza el número de diapositiva actual al número de diapositiva dado.
  public setSlide(e: Event, currentSlide: number) {

    e.stopPropagation();

    this.touchEventHandlerService.preventDefaultTouchend(e);

    if (this.touchEventHandlerService.itIsAMovingTouch(e)) return;

    if (e.type === "touchend") {

      this.viewSlide(currentSlide);
    }

    this.currentSlide = currentSlide;
  }
}

