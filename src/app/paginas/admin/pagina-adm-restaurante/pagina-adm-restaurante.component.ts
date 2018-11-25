import { Component, OnInit, OnDestroy } from '@angular/core';
import { RestauranteService } from 'src/app/services/restaurante.service';
import { UserService } from 'src/app/services/user.service';
import { Restaurante } from '../../../model/restaurante.model';
import { Subscription } from 'rxjs';
import { Prato } from 'src/app/model/prato.model';
import { PratoService } from 'src/app/services/prato.service';
import { Router } from '@angular/router';

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
    private router:Router) { }

  getUrlImagem(img: String): String {
    return "http://localhost:3000/static/" + img;
  }

  ngOnInit() {
    // recuperar o restaurante do gerente
    this.listenerRestaurante = this.restauranteService.getRestauranteUpdated().subscribe(res => {
      this.restaurante = res;

      var subs: Subscription = this.pratoService.recuperarPratosRestaurante(this.restaurante.idRestaurente).subscribe(lista => {
        this.listaPratos = lista;
        subs.unsubscribe();
      });
    });
    this.restauranteService.carregarRestaurante(this.userService.getUserId());

  }
  ngOnDestroy() {
    this.listenerRestaurante.unsubscribe();
  }
  inserirPratoDia(p:Prato){
    console.log(p);
    this.router.navigate(['/registro/periodo/'+p.idpratos]);
  }

}
