import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

    //LoadingService emite un valor booleano para indicar si los datos almacenados (indicador de carga) debe mostrarse o no. 

    public shouldShowLoading$: ReplaySubject<boolean> = new ReplaySubject<boolean>();

    //El constructor del servicio inicializa el ReplaySubject en false para indicar que el indicador de carga no debe mostrarse inicialmente.
    constructor() {
      this.shouldShowLoading$.next(false);
    }

    //showLoading() y hideLoading() emiten un valor booleano al ReplaySubject para indicar si el indicador de carga debe mostrarse o no. Al llamar al método showLoading(), el valor emitido es true, y al llamar al método hideLoading(), el valor emitido es false.
    
    public showLoading() {
      this.shouldShowLoading$.next(true);
    }

    public hideLoading() {
      this.shouldShowLoading$.next(false);
    }
}
