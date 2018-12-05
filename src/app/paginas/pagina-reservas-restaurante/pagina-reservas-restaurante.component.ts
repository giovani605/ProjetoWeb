import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { reservaUsuario } from 'src/app/model/reservaUsuario.model';
import { RestauranteService } from 'src/app/services/restaurante.service';

@Component({
  selector: 'app-pagina-reservas-restaurante',
  templateUrl: './pagina-reservas-restaurante.component.html',
  styleUrls: ['./pagina-reservas-restaurante.component.css']
})
export class PaginaReservasRestauranteComponent implements OnInit {

  public reservas: reservaUsuario[];
  public tamanho: number;

  constructor( private reserva: ReservaService,
    private user: UserService,
    private restauranteService:RestauranteService) { }

  ngOnInit() {
    this.reserva.buscarReservasRestaurante(this.restauranteService.getIdRestaurante()).subscribe(dados => {
      this.reservas = dados;
      console.log(this.reservas.length);
    });
    
  }
  getUrlImagem(img: String): String {
    return 'http://localhost:3000/static/' + img;
  }
}
