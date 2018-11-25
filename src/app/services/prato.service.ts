import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Prato } from '../model/prato.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PratoService {

  constructor(private http: HttpClient) { }

  // chamar essa funcao com o prato com todos os dados
  inserirPrato(dadosPrato, Imagem, callback) {
    var fd = new FormData();
    var teste = JSON.stringify({ "teste": "oi" });
    fd.append('imagem', Imagem, "imagem01.png");
    fd.append('dados', JSON.stringify(dadosPrato));
    fd.append('teste', teste);
    this.http.post("http://localhost:3000/prato/registrar", fd).subscribe(response => {
      console.log(response);
      callback(response);
    });
  }
  converterPratoDadosBack(a) {
    var p = new Prato();
    p.descricao = a["descricao"];
    p.restaurante_idrestaurante = a["restaurante_idrestaurante"];
    p.idpratos = a["idpratos"];
    p.idimagem = a["idimagem"];
    p.nome = a["nome"];
    p.tag_idtag = a["tag_idtag"];
    return p;
  }

  recuperarPratosRestaurante(idRestaurante) {
    var subject:Subject<Prato[]> = new Subject<Prato[]>();
    this.http.get("http://localhost:3000/prato/restaurante/" + idRestaurante).subscribe(response => {
      console.log(response["dados"]);
      var lista: Prato[] = [];
      for (let a of response["dados"]) {
        var b = this.converterPratoDadosBack(a);
        lista.push(a);
      }
      console.log("lista de pratos");
      console.log(lista);
      subject.next(lista);
    });
    return subject.asObservable();
  }
}
