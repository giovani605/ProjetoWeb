import { Comentario } from "./../../../model/comentario.model";
import { PratoService } from "./../../../services/prato.service";
import { Component, OnInit } from "@angular/core";
import { Restaurante } from "src/app/model/restaurante.model";
import { RestauranteService } from "src/app/services/restaurante.service";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { LocalizacaoService } from "src/app/services/localizacao.service";
import { Prato } from "src/app/model/prato.model";
import { UserService } from "src/app/services/user.service";
import { ComentarioService } from "src/app/services/comentario.service";

@Component({
  selector: "app-pagina-restaurante",
  templateUrl: "./pagina-restaurante.component.html",
  styleUrls: ["./pagina-restaurante.component.css"]
})
export class PaginaRestauranteComponent implements OnInit {
  public restaurante: Restaurante = new Restaurante();
  public nomeCidade = "";
  public pratos: Prato[] = [];
  public cardapio: boolean = true;
  public notaRestaurante: number;
  public mediaRestaurante: number;
  public comentarios: Comentario[] = [];
  public avaliacao: string;

  constructor(
    private restauranteService: RestauranteService,
    public local: LocalizacaoService,
    private pratoService: PratoService,
    private route: ActivatedRoute,
    private userService: UserService,
    private comentariosService: ComentarioService
  ) {}

  ngOnInit() {
    this.mediaRestaurante = 0;
    this.avaliacao = "";
    this.route.params.subscribe(params => {
      console.log(params);
      let id = params["id"];
      let subs: Subscription = this.restauranteService
        .buscaRestauranteIdRestaurante(id)
        .subscribe(dados => {
          this.restaurante = dados;
          subs.unsubscribe();
          console.log(this.restaurante);
          this.getNomeCidade();
          this.getPratos();
          this.getComentarios();
          this.getMediaRestaurante();
        });
    });
  }

  getNomeCidade() {
    // tslint:disable-next-line:prefer-const
    let nome: string;
    this.local.getCidadeByIDCidade(this.restaurante.cidades_id, retorno => {
      // tslint:disable-next-line:quotemark
      this.nomeCidade = retorno["nome"];
    });
  }

  getPratos() {
    this.pratoService
      .recuperarPratosRestaurante(this.restaurante.idRestaurente)
      .subscribe(retorno => {
        this.pratos = retorno;
      });
  }

  alterar(a) {
    if (a === 1) {
      this.cardapio = true;
    } else {
      this.cardapio = false;
    }
  }

  getUrlImagem(img: String): String {
    return "http://localhost:3000/static/" + img;
  }

  seguir() {
    var obs: Subscription = this.restauranteService
      .seguirRestaurante(
        this.userService.getUserId(),
        this.restaurante.idRestaurente
      )
      .subscribe(resposta => {
        if (resposta["flag"]) {
          alert("sucesso");
        } else {
          alert("falha ao seguir");
        }
        obs.unsubscribe();
      });
  }

  //falta implementar
  realizarComentario() {
    let coment: Comentario = new Comentario();
    coment.idUsuario = this.userService.getUserId();
    coment.comentario = this.avaliacao;
    coment.nota = this.notaRestaurante;
    coment.idObjeto = this.restaurante.idRestaurente;

    console.log(coment);

    this.comentariosService
      .inserirComentaioRestaurante(coment)
      .subscribe(retorno => {
        this.notaRestaurante = 0;
        this.avaliacao = '';
        this.getMediaRestaurante();
        this.getComentarios();
      });
  }

  getComentarios() {
    this.comentariosService
      .buscaComentariosRestaurante(this.restaurante.idRestaurente)
      .subscribe(retorno => {
        this.comentarios = retorno;
      });
  }

  getMediaRestaurante() {
    this.comentariosService
      .buscaMediaRestaurante(this.restaurante.idRestaurente)
      .subscribe(retorno => {
        this.mediaRestaurante = retorno;
        console.log("Valor da média retornado do banco de dados: " + retorno);
      });
  }
}
