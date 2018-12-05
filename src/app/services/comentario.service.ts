import { HttpClient } from "@angular/common/http";
import { Comentario } from "./../model/comentario.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ComentarioService {
  constructor(private http: HttpClient) {}

  buscaComentariosRestaurante(id) {
    let subComentariosRestaurante: Subject<Comentario[]> = new Subject<
      Comentario[]
    >();
    this.http
      .get("http://localhost:3000/comentario/buscar/restaurante/" + id)
      .subscribe(response => {
        let restorno: Comentario[] = [];
        if (response["flag"]) {
          for (let aux of response["dados"]) {
            let coment: Comentario;
            coment = this.converteComentarioRestaurante(aux);
            restorno.push(coment);
          }
        }
        subComentariosRestaurante.next(restorno);
      });
    return subComentariosRestaurante.asObservable();
  }

  buscaComentariosPrato(id: number) {
    let subComentariosPrato: Subject<Comentario[]> = new Subject<
      Comentario[]
    >();
    this.http
      .get("http://localhost:3000/comentario/buscar/prato/" + id)
      .subscribe(response => {
        let restorno: Comentario[] = [];
        if (response["flag"]) {
          for (let aux of response["dados"]) {
            let coment: Comentario;
            coment = this.converteComentarioPrato(aux);
            restorno.push(coment);
          }
        }
        subComentariosPrato.next(restorno);
      });
    return subComentariosPrato.asObservable();
  }

  inserirComentarioPrato(dado: Comentario) {
    let subInserirComentarioPrato: Subject<boolean> = new Subject<boolean>();
    this.http
      .post("http://localhost:3000/comentario/inserir/prato/", dado)
      .subscribe(response => {
        let restorno: boolean = response["flag"];
        subInserirComentarioPrato.next(restorno);
      });
    return subInserirComentarioPrato.asObservable();
  }

  inserirComentaioRestaurante(dado: Comentario) {
    let subInserirComenrarioRestaurante: Subject<boolean> = new Subject<boolean>();
    console.log(dado);
    this.http
      .post("http://localhost:3000/comentario/inserir/restaurante/", dado)
      .subscribe(response => {
        let restorno: boolean = response["flag"];
        subInserirComenrarioRestaurante.next(restorno);
      });
    return subInserirComenrarioRestaurante.asObservable();
  }

  buscaMediaRestaurante(id) {
    let subMediaRestaurante: Subject<number> = new Subject<number>();
    this.http
      .get("http://localhost:3000/comentario/media/restaurante/" + id)
      .subscribe(response => {
        let restorno: number = Number(response["dados"][0]["media"]);
        subMediaRestaurante.next(restorno);
      });
    return subMediaRestaurante.asObservable();
  }

  buscaMediaPrato(id) {
    let subMediaPrato: Subject<number> = new Subject<number>();
    this.http
      .get("http://localhost:3000/comentario/media/prato/" + id)
      .subscribe(response => {
        let restorno: number = Number(response["dados"][0]['media']);
        subMediaPrato.next(restorno);
      });
    return subMediaPrato.asObservable();
  }

  totalSeguidoresRestaurante(id) {
    let subSeguidoresRestaurante: Subject<number> = new Subject<number>();
    this.http
      .get("http://localhost:3000/comentario/total/seguidores/restaurante/" + id)
      .subscribe(response => {
        let restorno: number = Number(response["dados"][0]['total']);
        subSeguidoresRestaurante.next(restorno);
      });
    return subSeguidoresRestaurante.asObservable();
  }

  totalAvaliacoesRestaurante(id) {
    let subAvaliacoesRestaurante: Subject<number> = new Subject<number>();
    this.http
      .get("http://localhost:3000/comentario/total/avaliacoes/restaurante/" + id)
      .subscribe(response => {
        let restorno: number = Number(response["dados"][0]['total']);
        subAvaliacoesRestaurante.next(restorno);
      });
    return subAvaliacoesRestaurante.asObservable();
  }

  totalAvaliacoesPrato(id) {
    let subAvaliacoesPrato: Subject<number> = new Subject<number>();
    this.http
      .get("http://localhost:3000/comentario/total/avaliacoes/prato/" + id)
      .subscribe(response => {
        let restorno: number = Number(response["dados"][0]['total']);
        subAvaliacoesPrato.next(restorno);
      });
    return subAvaliacoesPrato.asObservable();
  }

  private converteComentarioPrato(dado): Comentario {
    let retorno: Comentario = new Comentario();
    retorno.idComentario = dado["idcomentarios_pratos"];
    retorno.idUsuario = dado["cliente_idusuario"];
    retorno.idObjeto = dado["pratos_idpratos"];
    retorno.nomeUsuario = dado["nome"];
    retorno.nota = dado["nota"];
    retorno.comentario = dado["comentario"];
    retorno.data = new Date(dado["data"]);

    return retorno;
  }

  private converteComentarioRestaurante(dado): Comentario {
    let retorno: Comentario = new Comentario();
    retorno.idComentario = dado["idcomentario"];
    retorno.idUsuario = dado["cliente_idusuario"];
    retorno.idObjeto = dado["restaurante_idrestaurante"];
    retorno.nomeUsuario = dado["nome"];
    retorno.nota = dado["nota"];
    retorno.comentario = dado["comentario"];
    retorno.data = new Date(dado["data"]);

    return retorno;
  }
}
