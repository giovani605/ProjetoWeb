import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Restaurante } from '../model/restaurante.model';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  private subsRestaurante = new Subject<Restaurante>();

  getRestauranteUpdated(){
    return this.subsRestaurante.asObservable();
  }
  getIdRestaurante(){
    return this.restaurante.idRestaurente;
  }

  public restaurante: Restaurante = new Restaurante();

  constructor(private http: HttpClient) { }

  registrarRestaurante(idGerente, dadosRestaurante, callback) {
    var data = {
      "idGerente": idGerente,
      "dadosRestaurante": dadosRestaurante
    }
    this.http.post("http://localhost:3000/restaurante/registrar", data).subscribe(response => {
      console.log(response);
      callback(response["msg"]);
    });

  }
  private setRestauranteDadosBack(a) {
    this.restaurante.cidades_id = a["cidades_id"];
    this.restaurante.idRestaurente = a["idrestaurente"];
    this.restaurante.gerente_idgerente = a["gerente_idgerente"];
    this.restaurante.nome = a["nome"];
    this.restaurante.descricao = a["descricao"];
    this.restaurante.telefone = a["telefone"];
    this.restaurante.rua = a["rua"];
    this.restaurante.numero = a["numero"];
  }
  private setRestaurante(a:Restaurante){
    this.restaurante = a;
    this.subsRestaurante.next(this.restaurante);
  }

  converterRestaurante(a):Restaurante {
    var res:Restaurante = new Restaurante();
    res.cidades_id = a["cidades_id"];
    res.idRestaurente = a["idrestaurante"];
    res.gerente_idgerente = a["gerente_idgerente"];
    res.nome = a["nome"];
    res.descricao = a["descricao"];
    res.telefone = a["telefone"];
    res.rua = a["rua"];
    res.numero = a["123"];
    return res;
  }


  carregarRestaurante(idUser) {
    // recuperar o as informações do restaurante
    console.log("iduser: " + idUser);
    this.http.get("http://localhost:3000/restaurante/usuario/" + idUser).subscribe(response => {
      if (response["flagDados"]) {
        console.log("Carregando restaurente");
        console.log(response["dados"][0])
        var res = this.converterRestaurante(response["dados"][0]);
        this.setRestaurante(res);
        console.log(this.restaurante);
      }
      else {
        // faz alguma coisa
      }
    });

  }



}
