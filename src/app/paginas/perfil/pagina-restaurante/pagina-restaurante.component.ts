import { Component, OnInit } from '@angular/core';
import { Restaurante } from 'src/app/model/restaurante.model';
import { RestauranteService } from 'src/app/services/restaurante.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LocalizacaoService } from 'src/app/services/localizacao.service';

@Component({
  selector: 'app-pagina-restaurante',
  templateUrl: './pagina-restaurante.component.html',
  styleUrls: ['./pagina-restaurante.component.css']
})
export class PaginaRestauranteComponent implements OnInit {

  public restaurante: Restaurante = new Restaurante();


  constructor(private restauranteService: RestauranteService,
    public local: LocalizacaoService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);
      var id = params['id'];
      console.log("vai carregar o restaurante");
      var subs: Subscription = this.restauranteService.buscaRestauranteIdRestaurante(id).subscribe(dados => {
        this.restaurante = dados;
        subs.unsubscribe();
        console.log(this.restaurante);
      });
    });
  }

  getNomeCidade(): string{
    let nome: string;
    this.local.getCidadeByIDCidade(this.restaurante.cidades_id, retorno => {
      nome = retorno;
    });
    return nome;
  }

}
