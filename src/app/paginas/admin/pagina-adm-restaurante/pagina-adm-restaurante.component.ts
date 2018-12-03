import { Component, OnInit, OnDestroy } from '@angular/core';
import { RestauranteService } from 'src/app/services/restaurante.service';
import { UserService } from 'src/app/services/user.service';
import { Restaurante } from '../../../model/restaurante.model';
import { Subscription } from 'rxjs';
import { Prato } from 'src/app/model/prato.model';
import { PratoService } from 'src/app/services/prato.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pagina-adm-restaurante',
  templateUrl: './pagina-adm-restaurante.component.html',
  styleUrls: ['./pagina-adm-restaurante.component.css']
})
export class PaginaAdmRestauranteComponent implements OnInit, OnDestroy {

  public restaurante: Restaurante = new Restaurante();
  public listaPratos: Prato[] = [];
  private listenerRestaurante: Subscription;

  constructor(private restauranteService: RestauranteService
    , private userService: UserService,
    private pratoService: PratoService,
    private router: Router,
    private modalService: NgbModal) { }

  getUrlImagem(img: String): String {
    return 'http://localhost:3000/static/' + img;
  }

  ngOnInit() {
    // recuperar o restaurante do gerente
    this.listenerRestaurante = this.restauranteService.getRestauranteUpdated().subscribe(res => {
      this.restaurante = res;

      // tslint:disable-next-line:prefer-const
      let subs: Subscription = this.pratoService.recuperarPratosRestaurante(this.restaurante.idRestaurente).subscribe(lista => {
        this.listaPratos = lista;
        subs.unsubscribe();
      });
    });
    this.restauranteService.carregarRestaurante(this.userService.getUserId());

  }
  ngOnDestroy() {
    this.listenerRestaurante.unsubscribe();
  }
  inserirPratoDia(p: Prato) {
    console.log(p);
    this.router.navigate(['/registro/periodo/' + p.idpratos]);
  }
  closeResult: string;
  private pratoPromocao = new Prato();
  open(content, prato) {
    this.pratoPromocao = prato;
    this.codigo = "";
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
      return  `with: ${reason}`;
    }
  }
  public codigo:string = "";

  criarPromocao(){
    console.log("implementar em casa");
    var subs:Subscription = this.restauranteService.criarCodigoPromocao(this.pratoPromocao,this.codigo).subscribe(resposta =>{
      if(resposta["flag"]){
        alert("sucesso");
      }
      else{
        alert(resposta["mensagem"]);
      }
      subs.unsubscribe();
    });


  }
  

}
