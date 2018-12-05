import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FeedItem } from '../../model/feedItem.model';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Usuario } from 'src/app/model/usuario.model';
import { Notificacao } from 'src/app/model/notificacao.model';
import { Restaurante } from 'src/app/model/restaurante.model';
import { RestauranteService } from 'src/app/services/restaurante.service';
import { LocalizacaoService } from 'src/app/services/localizacao.service';

@Component({
  selector: 'app-feed-item',
  templateUrl: './feed-item.component.html',
  styleUrls: ['./feed-item.component.css']
})
export class FeedItemComponent implements OnInit, OnDestroy {

  public listaAmigos: Usuario[] = [];
  @Input('valor') item: FeedItem;
  closeResult: string;
  public restaurante: Restaurante = new Restaurante();
  public nomeCidade:string = "";

  carregarRestaurante() {
    var subs1: Subscription = this.restauranteService.buscaRestauranteIdRestaurante(this.item.prato.restaurante_idrestaurante).subscribe(dados => {
      this.restaurante = dados;
      this.getNomeCidade();
      subs1.unsubscribe();
    })
  }
  getNomeCidade() {
    // tslint:disable-next-line:prefer-const
    let nome: string;
    this.localService.getCidadeByIDCidade(this.restaurante.cidades_id, retorno => {
      // tslint:disable-next-line:quotemark
      this.nomeCidade = retorno["nome"];
    });
  }

  private subsAmigos: Subscription;
  constructor(private router: Router,
    private modalService: NgbModal,
    private userService: UserService,
    private restauranteService: RestauranteService,
    private localService:LocalizacaoService) { }

  ngOnInit() {
    this.subsAmigos = this.userService.getListenerListaAmigos().subscribe(dados => {
      this.listaAmigos = dados;
    });
  }
  carregarAmigos(){
    this.userService.carregarAmigos();
  }
  ngOnDestroy() {
    this.subsAmigos.unsubscribe();
  }

  share(user: Usuario) {
    // criar a notificacao para o prato e mandar pra o back end
    var notificacao: Notificacao = new Notificacao();
    notificacao.ativo = 1;
    console.log("meu usuario " + this.userService.getUserId());
    notificacao.idremetente = this.userService.getUserId();
    console.log("usuario id destino" + user.idUsuario);
    notificacao.idusuario = user.idUsuario;
    notificacao.descricao = this.userService.getUser().nome + " compartilhou " +
      this.item.prato.nome + " com você";
    notificacao.link = "/prato/" + this.item.prato.idpratos;
    this.userService.enviarNotificacao(notificacao).subscribe(dados => {
      if (dados["flag"]) {
        alert("sucesso");
      } else {
        alert("falha ao enviar a notifição");
      }
    });
  }

  redirecionarPaginaPrato() {
    this.router.navigate(['prato/' + this.item.prato.idpratos]);
  }

  redirecionarCompartilhar() {
    this.router.navigate(['prato/compartilhar/' + this.item.prato.idpratos]);
  }

  redirecionarReservar() {
    this.router.navigate(['prato/reservar/' + this.item.prato.idpratos]);
  }

  redirecionarRestaurante(event) {
    console.log('oiew');
    this.router.navigate(['restaurante/' + this.item.prato.restaurante_idrestaurante]);
  }

  open(content) {
    this.carregarAmigos();
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


}
