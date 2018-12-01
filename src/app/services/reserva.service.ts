import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { reservaUsuario } from '../model/reservaUsuario.model';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  constructor(private http: HttpClient) {}

  retornarTodasReservas(idusuario: number, callback): void {
    const reservas: reservaUsuario[] = [];
    this.http
      .get(
        'http://localhost:3000/reserva//buscarReservasPorUsuario/' + idusuario
      )
      .subscribe(retorno => {
        for (const row of retorno['dados']) {
          const aux: reservaUsuario = this.converteReservaBack(row);
          console.log(aux);
          reservas.push(aux);
        }
      });

    callback(reservas);
  }

  private converteReservaBack(dado) {
    const aux: reservaUsuario = new reservaUsuario();
    aux.idReserva = dado['idreserva'];
    aux.data = new Date(dado['data']);
    aux.idPromocao = dado['dipromocao'];
    aux.nomePrato = dado['nomePrato'];
    aux.caminhoImagem = dado['idimagem'];
    aux.descricaoPrato = dado['descricao'];
    aux.nomeRestaurante = dado['nomeRestaurante'];
    aux.descricaoPromocao = undefined;
    return aux;
  }
}
