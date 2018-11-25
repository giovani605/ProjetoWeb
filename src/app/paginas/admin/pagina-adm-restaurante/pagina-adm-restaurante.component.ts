import { Component, OnInit, OnDestroy } from '@angular/core';
import { RestauranteService } from 'src/app/services/restaurante.service';
import { UserService } from 'src/app/services/user.service';
import { Restaurante } from '../../../model/restaurante.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pagina-adm-restaurante',
  templateUrl: './pagina-adm-restaurante.component.html',
  styleUrls: ['./pagina-adm-restaurante.component.css']
})
export class PaginaAdmRestauranteComponent implements OnInit, OnDestroy {

  public restaurante: Restaurante = new Restaurante();
  private listenerRestaurante: Subscription;

  constructor(private restauranteService: RestauranteService
    , private userService: UserService) { }

  ngOnInit() {
    // recuperar o restaurante do gerente
    this.listenerRestaurante = this.restauranteService.getRestauranteUpdated().subscribe(res => {
      this.restaurante = res;
    });
    this.restauranteService.carregarRestaurante(this.userService.getUserId());

  }
  ngOnDestroy() {
    this.listenerRestaurante.unsubscribe();
  }


}
