import { Component, OnInit } from '@angular/core';
import { RestauranteService } from 'src/app/services/restaurante.service';
import { Subject, Subscription } from 'rxjs';
import { PratoService } from 'src/app/services/prato.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pagina-aprovar-carpadio',
  templateUrl: './pagina-aprovar-carpadio.component.html',
  styleUrls: ['./pagina-aprovar-carpadio.component.css']
})
export class PaginaAprovarCarpadioComponent implements OnInit {

  public listaPratos: any[] = [];
  public listaPratosPeriodo: any[] = [];


  constructor(private restauranteService: RestauranteService,
    private pratoService: PratoService,
    private userService: UserService) { }

  ngOnInit() {
    var subs1: Subscription = this.pratoService.recuperarPratoDiaAprovar(this.restauranteService.getIdRestaurante()).subscribe(dados => {
      this.listaPratos = dados;
      subs1.unsubscribe();
    });
    var subs2: Subscription = this.pratoService.recuperarPratoPeriodoAprovar(this.restauranteService.getIdRestaurante()).subscribe(dados => {
      this.listaPratosPeriodo = dados;
      subs2.unsubscribe();
    });
  }
  formatarData(a) {
    var b = new Date(a);
    return b.getDate() + "/" + Number(b.getMonth() + 1) + "/" + b.getFullYear();
  }

  aceitarSimples(pratoDia: any) {
    var subs1: Subscription = this.pratoService.aceitarPratoDiaSimples(pratoDia.pratoDia.idprato_dia, this.userService.getUserId()).subscribe(resposta => {
      if (resposta["flag"]) {
        alert("sucesso");
      } else {
        alert(resposta["dados"]);
      }
      subs1.unsubscribe();
    });

  }

}
