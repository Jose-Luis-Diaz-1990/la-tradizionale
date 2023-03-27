import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from '../../services/loading/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  // El observable siempre estará actualizado y mostrará una representación visual del estado de carga de la aplicación.

  public showLoading$?: Observable<boolean>;

  constructor(private loadingService: LoadingService) {}

  //ngOnInit inicializará el observable y permitirá al usuario ver los datos almacenados (estado de carga) en cualquier momento.
  public ngOnInit(): void {
      this.showLoading$ = this.loadingService.shouldShowLoading$;
  }
}
