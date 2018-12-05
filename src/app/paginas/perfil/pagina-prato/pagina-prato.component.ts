import { ReservaService } from './../../../services/reserva.service';
import { Comentario } from './../../../model/comentario.model';
import { Subscription } from 'rxjs';
import { ComentarioService } from "src/app/services/comentario.service";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { PratoService } from "src/app/services/prato.service";
import { UserService } from "src/app/services/user.service";
import { Prato } from 'src/app/model/prato.model';
import { Tag } from 'src/app/model/tag.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

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
  public tags: Tag[];
  closeResult: string;
  public dataReserva: string;
  public promocao: string;

  constructor(
    private pratoService: PratoService,
    private route: ActivatedRoute,
    private userService: UserService,
    private comentariosService: ComentarioService,
    private modalService: NgbModal,
    private reservaService: ReservaService,
  ) { }

  ngOnInit() {
    this.promocao = null;
    this.dataReserva = '';
    this.prato = new Prato();
    this.comentarios = [];
    this.mediaPrato = 0;
    this.notaPrato = 0;
    this.avaliacao = '';
    this.avaliacoes = 0;
    this.tags = [];
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
          this.getMediaPrato();
          this.recuperarTagsPrato();
        });
    });
  }


  recuperarTagsPrato() {
    var subs1: Subscription = this.pratoService.recuperarTagsPrato(this.prato.idpratos).subscribe(dados => {
      this.tags = dados;
      subs1.unsubscribe();
    });
  }

  getComentarios() {
    this.comentariosService.buscaComentariosPrato(this.prato.idpratos).subscribe(retorno => {
      this.comentarios = retorno;
    });
  }

  getAvaliacoes() {
    this.comentariosService.totalAvaliacoesPrato(this.prato.idpratos).subscribe(retorno => {
      this.avaliacoes = retorno;
    });
  }

  getMediaPrato() {
    this.comentariosService.buscaMediaPrato(this.prato.idpratos).subscribe(retorno => {
      this.mediaPrato = retorno;
    });
  }

  getTags() {
    this.pratoService.recuperarTagsPrato(this.prato.idpratos).subscribe(retorno => {
      this.tags = retorno;
    });
  }

  realizarComentario() {
    let coment: Comentario = new Comentario();
    coment.idUsuario = this.userService.getUserId();
    coment.comentario = this.avaliacao;
    coment.nota = this.notaPrato;
    coment.idObjeto = this.prato.idpratos;

    console.log(coment);

    this.comentariosService
      .inserirComentarioPrato(coment)
      .subscribe(retorno => {
        this.notaPrato = 0;
        this.avaliacao = '';
        this.getMediaPrato();
        this.getComentarios();
        this.getAvaliacoes();
      });
  }

  getUrlImagem(img: String): String {
    return "http://localhost:3000/static/" + img;
  }

  open(content) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  fazerReserva() {

    if (this.dataReserva == null) {
      alert('Escolha o dia da reserva');
    } else {
      this.reservaService
      .reservar(this.prato.idpratos, this.userService.getUserId(), this.dataReserva, this.promocao)
      .subscribe(resposta => {
        if(resposta["flag"]){
          alert("sucesso");
        }else{
          alert(resposta["msg"]);
        }
      });
    }
  }
}
