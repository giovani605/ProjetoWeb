import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ReservaService } from 'src/app/services/reserva.service';
import { UserService } from 'src/app/services/user.service';
import { Prato } from 'src/app/model/prato.model';
import { reservaUsuario } from 'src/app/model/reservaUsuario.model';

@Component({
  selector: 'app-pagina-reservas-usuario',
  templateUrl: './pagina-reservas-usuario.component.html',
  styleUrls: ['./pagina-reservas-usuario.component.css']
})
export class PaginaReservasUsuarioComponent implements OnInit {
  public reservas: reservaUsuario[];
  public tamanho: number;

  constructor(
    private reserva: ReservaService,
    private user: UserService
  ) { }

  ngOnInit() {
    this.reserva.retornarTodasReservas(this.user.getUserId(), (retorno) => {
      this.reservas = retorno;
    });
    console.log(this.reservas.length);
  }

  getUrlImagem(img: String): String {
    return 'http://localhost:3000/static/' + img;
  }
}
