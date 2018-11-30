import { Component, OnInit } from '@angular/core';
import { ReservaService } from 'src/app/services/reserva.service';

@Component({
  selector: 'app-pagina-reservas-usuario',
  templateUrl: './pagina-reservas-usuario.component.html',
  styleUrls: ['./pagina-reservas-usuario.component.css']
})
export class PaginaReservasUsuarioComponent implements OnInit {

  constructor(
    private reserva: ReservaService
  ) { }

  ngOnInit() {
  }

}
