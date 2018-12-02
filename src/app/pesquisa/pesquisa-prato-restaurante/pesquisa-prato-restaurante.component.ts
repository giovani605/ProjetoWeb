import { Component, OnInit } from '@angular/core';
import { RestauranteService } from 'src/app/services/restaurante.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pesquisa-prato-restaurante',
  templateUrl: './pesquisa-prato-restaurante.component.html',
  styleUrls: ['./pesquisa-prato-restaurante.component.css']
})
export class PesquisaPratoRestauranteComponent implements OnInit {

  public listaPesquisa: any[] = [];

  public nome = "";
  constructor(private restauranteService: RestauranteService) { }

  ngOnInit() {
  }
  pesquisar(valor) {
    if (valor == "" || valor == null) {
      this.listaPesquisa = [];
      return;
    }
    this.nome = valor;
    var subs1: Subscription = this.restauranteService.pesquisaPratoRestauranteNome(this.nome).subscribe(dados => {
      this.listaPesquisa = dados;
      subs1.unsubscribe();
    })
  }
}
