import { Component, OnInit } from '@angular/core';
import { RestauranteService } from 'src/app/services/restaurante.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-barra-lateral',
  templateUrl: './barra-lateral.component.html',
  styleUrls: ['./barra-lateral.component.css']
})
export class BarraLateralComponent implements OnInit {

  constructor(public restauranteService: RestauranteService) { }

  isGerente() {
    return this.restauranteService.isGerente();
  }

  hasRestaurante() {
    return this.restauranteService.hasRestaurante();
  }

  ngOnInit() {

  }
  openNav() {
    document.getElementById('mySidenav').style.width = '250px';
    
  }

  /* Set the width of the side navigation to 0 */
  closeNav() {
    document.getElementById('mySidenav').style.width = '1px';
  }

}
