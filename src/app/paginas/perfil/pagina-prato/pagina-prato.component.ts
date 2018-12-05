import { Comentario } from './../../../model/comentario.model';
import { Subscription } from 'rxjs';
import { ComentarioService } from "src/app/services/comentario.service";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { PratoService } from "src/app/services/prato.service";
import { UserService } from "src/app/services/user.service";
import { Prato } from 'src/app/model/prato.model';

@Component({
  selector: "app-pagina-prato",
  templateUrl: "./pagina-prato.component.html",
  styleUrls: ["./pagina-prato.component.css"]
})
export class PaginaPratoComponent implements OnInit {
  public prato: Prato;
  public comentarios: Comentario[];
  public mediaPrato: number;
  public avaliacao: string;
  public notaPrato: number;
  public avaliacoes: number;

  constructor(
    private pratoService: PratoService,
    private route: ActivatedRoute,
    private userService: UserService,
    private comentariosService: ComentarioService
  ) {}

  ngOnInit() {
    this.prato = new Prato();
    this.comentarios = [];
    this.mediaPrato = 0;
    this.notaPrato = 0;
    this.avaliacao = '';
    this.avaliacoes = 0;
    this.route.params.subscribe(params => {
      console.log(params);
      let id = params["id"];
      let subs: Subscription = this.pratoService.recuperarPratoId(id)
        .subscribe(dados => {
          this.prato = dados;
          subs.unsubscribe();
          console.log(this.prato);
          this.getComentarios();
          this.getAvaliacoes();
        });
    });
  }

  getComentarios(){
    this.comentariosService.buscaComentariosPrato(this.prato.idpratos).subscribe( retorno => {
      this.comentarios = retorno;
    });
  }

  getAvaliacoes() {
    this.comentariosService.totalAvaliacoesPrato(this.prato.idpratos).subscribe(retorno => {
      this.avaliacoes = retorno;
    });
  }

  realizarComentario() {

  }
}
