import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pesquisa-prato-restaurante',
  templateUrl: './pesquisa-prato-restaurante.component.html',
  styleUrls: ['./pesquisa-prato-restaurante.component.css']
})
export class PesquisaPratoRestauranteComponent implements OnInit {

  public listaPesquisa:any[] = [];

  public nome = "";
  constructor() { }

  ngOnInit() {
  }
  pesquisar(valor){
    this.nome = valor;
    console.log(this.nome);
  }
}
