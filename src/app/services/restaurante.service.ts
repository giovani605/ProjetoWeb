import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Restaurante } from '../model/restaurante.model';
import { Subject } from "rxjs";
import { UserService } from './user.service';
import { Usuario } from '../model/usuario.model';
import { ItemPesquisa } from '../model/itemPesquisa.model';
import { Prato } from '../model/prato.model';


@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  private subsRestaurante = new Subject<Restaurante>();
  private existeRestaurante = false;
  private flagGerente = false;
  private flagColaborador = false;
  private idGerente: number = 0;

  getIdGerente() {
    return this.idGerente;
  }

  isGerente() {
    return this.flagGerente;
  }

  isColaborador() {
    return this.flagColaborador;
  }


  hasRestaurante() {
    return this.existeRestaurante;
  }

  getRestauranteUpdated() {
    return this.subsRestaurante.asObservable();
  }
  getIdRestaurante() {
    return this.restaurante.idRestaurente;
  }

  public restaurante: Restaurante = new Restaurante();

  constructor(private http: HttpClient, private userService: UserService) { }

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
  private setRestaurante(a: Restaurante) {
    this.restaurante = a;
    this.subsRestaurante.next(this.restaurante);
  }

  converterRestaurante(a): Restaurante {
    var res: Restaurante = new Restaurante();
    res.cidades_id = a["cidades_id"];
    res.idRestaurente = a["idrestaurante"];
    res.gerente_idgerente = a["gerente_idgerente"];
    res.nome = a["nome"];
    res.descricao = a["descricao"];
    res.telefone = a["telefone"];
    res.rua = a["rua"];
    res.numero = a["numero"];
    return res;
  }

  // cuidar que essa funcao tem logica de negocio
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
        this.existeRestaurante = true;
        // carregar se eh gerente ou colaborador
        this.flagColaborador = response["flagColaborador"];
        this.flagGerente = response["flagGerente"];
        this.idGerente = Number(response["idGerente"]);
      }
      else {
        this.existeRestaurante = false;
        this.flagColaborador = response["flagColaborador"];
        this.flagGerente = response["flagGerente"];
      }
    });

  }
  isColaboradorBuscar(idUser) {
    var subject: Subject<boolean> = new Subject<boolean>();
    this.http.get("http://localhost:3000/restaurante/isColaborador/" + idUser).subscribe(response => {
      var b: boolean = response["flag"]
      console.log("isColaborador");
      console.log(b);
      subject.next(b);
    });
    return subject.asObservable();

  }
  isGerenteBuscar(idUser) {
    var subject: Subject<boolean> = new Subject<boolean>();
    this.http.get("http://localhost:3000/restaurante/isGerente/" + idUser).subscribe(response => {
      var b: boolean = response["flag"]
      console.log("isGerente");
      console.log(b);
      subject.next(b);
    });
    return subject.asObservable();

  }

  procurarColaboradores(idGerente) {
    console.log("idGerente " + idGerente);
    var subject: Subject<Usuario[]> = new Subject<Usuario[]>();
    this.http.get("http://localhost:3000/restaurante/gerente/colaboradores/" + idGerente).subscribe(response => {
      var lista: Usuario[] = [];
      for (let a of response["dados"]) {
        var u = this.userService.converterUser(a);
        lista.push(u);
      }
      console.log("procurarColaboradores");
      console.log(lista);
      subject.next(lista);
    });
    return subject.asObservable();
  }

  inserirColaborador(idUser){
    console.log("inserirColaborador " + idUser);
    var subject: Subject<boolean> = new Subject<boolean>();
    var dados = {
      "idGerente" : this.idGerente,
      "idRestaurante" : this.getIdRestaurante(),
      "idUser" : idUser
    };
    this.http.post("http://localhost:3000/restaurante/gerente/inserir/colaboradores",dados).subscribe(response => {
      
      console.log("procurarColaboradores");
      console.log(response);
      subject.next(response["flag"]);
    });
    return subject.asObservable();
  }
  buscaRestauranteIdRestaurante(idRestaurante){
    console.log("buscaRestauranteIdRestaurante " + idRestaurante);
    var subs:Subject<Restaurante> = new Subject<Restaurante>();
    this.http.get("http://localhost:3000/restaurante/" + idRestaurante).subscribe(response => {
      if (response["flagDados"]) {
        console.log(response["dados"])
        var res = this.converterRestaurante(response["dados"]);
        subs.next(res);
      }else{
        subs.next();
      }
    });
    return subs;
  }
  // Todo
  pesquisaPratoRestauranteNome(nome){
    console.log("pesquisaPratoRestauranteNome " + nome);
    var subject: Subject<ItemPesquisa[]> = new Subject<ItemPesquisa[]>();
    this.http.get("http://localhost:3000/restaurante/buscar/juntos/" + nome).subscribe(response => {
      var lista: ItemPesquisa[] = [];
      for (let a of response["pratos"]) {
        var u = new ItemPesquisa();
        u.nome = a["nome"] + " em " + a["rnome"];
        u.link = "/prato/compartilhar/" + a["idpratos"];
        //u.link = "/usuario/amigos";
        lista.push(u);
      }
      for (let a of response["restaurantes"]) {
        var u = new ItemPesquisa();
        u.nome = a["nome"];
        u.link = "/restaurante/" + a["idrestaurante"];
        lista.push(u);
      }
      console.log("pesquisaPratoRestauranteNome");
      console.log(lista);
      subject.next(lista);
    });
    return subject.asObservable();

  }
  criarCodigoPromocao(prato:Prato,codigo:string){
    console.log("criarCodigoPromocao " + codigo);
    console.log(prato);
    var subject: Subject<any> = new Subject<any>();
    var dados = {
      "idGerente" : this.idGerente,
      "idRestaurante" : this.getIdRestaurante(),
      "prato" : prato,
      "codigo" : codigo
    };
    this.http.post("http://localhost:3000/restaurante/gerente/inserir/promocao",dados).subscribe(response => {
      console.log("procurarColaboradores");
      console.log(response);
      subject.next(response);
    });
    return subject.asObservable();
    
  }

}
