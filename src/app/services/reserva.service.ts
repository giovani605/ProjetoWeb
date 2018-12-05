import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { reservaUsuario } from '../model/reservaUsuario.model';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  constructor(private http: HttpClient) { }

  retornarTodasReservas(idusuario: number, callback): void {
    const reservas: reservaUsuario[] = [];
    this.http
      .get(
        'http://localhost:3000/reserva/buscarReservasPorUsuario/' + idusuario
      )
      .subscribe(retorno => {
        for (const row of retorno['dados']) {
          const aux: reservaUsuario = this.converteReservaUsuarioBack(row);
          console.log(aux);
          reservas.push(aux);
        }
      });

    callback(reservas);
  }
  reservar(idPrato, idUser, data_reserva, codigo) {
    var dados = {
      "idPrato": idPrato,
      "idUser": idUser,
      "data_reserva": data_reserva,
      "codigo": codigo
    }
    var subs: Subject<any> = new Subject<any>();
    this.http.post('http://localhost:3000/reserva/inserir', dados)
      .subscribe(retorno => {
        subs.next(retorno);
      });
    return subs.asObservable();
  }

  private converteReservaUsuarioBack(dado) {
    const aux: reservaUsuario = new reservaUsuario();
    aux.idReserva = dado['idreserva'];
    aux.data = new Date(dado['data_reserva']);
    aux.idPromocao = dado['idpromocao'];
    aux.nomePrato = dado['nomePrato'];
    aux.caminhoImagem = dado['idimagem'];
    aux.descricaoPrato = dado['descricao'];
    aux.nomeRestaurante = dado['nomeRestaurante'];
    aux.descricaoPromocao = undefined;
    return aux;
  }
}
