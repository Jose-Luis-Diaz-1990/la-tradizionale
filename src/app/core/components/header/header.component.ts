import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  {

  public isLogged: boolean = false;
  public showMenu: boolean = false;

  constructor(
    private router: Router,
  ) {}

  //Ruta que lleva a la página de not-found, se accede a ella cuando la url no existe.
  public navigateToNotFound() {
    this.router.navigate(['no-existe']);
  }


   
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
  }

