import { Component, OnInit } from '@angular/core';
import { CanActivate } from '@angular/router';
import { RestauranteService } from 'src/app/services/restaurante.service';

@Component({
  selector: 'app-pagina-colaboradores',
  templateUrl: './pagina-colaboradores.component.html',
  styleUrls: ['./pagina-colaboradores.component.css']
})
export class PaginaColaboradoresComponent implements OnInit,CanActivate {

  canActivate(){
    return this.restauranteService.isGerente();
  }

  constructor(private restauranteService:RestauranteService) { }

  ngOnInit() {
    
  }

}
