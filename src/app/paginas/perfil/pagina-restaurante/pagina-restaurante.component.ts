import { Component, OnInit } from '@angular/core';
import { Restaurante } from 'src/app/model/restaurante.model';
import { RestauranteService } from 'src/app/services/restaurante.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagina-restaurante',
  templateUrl: './pagina-restaurante.component.html',
  styleUrls: ['./pagina-restaurante.component.css']
})
export class PaginaRestauranteComponent implements OnInit {

  public restaurante: Restaurante = new Restaurante();


  constructor(private restauranteService: RestauranteService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      var id = params['id'];
      var subs: Subscription = this.restauranteService.buscaRestauranteIdRestaurante(id).subscribe(dados => {
        this.restaurante = dados;
        subs.unsubscribe();
      });
    });
  }



}
