import { Component, OnInit } from '@angular/core';

import { LocalizacaoService } from './../../services/localizacao.service';
import { Estado } from './../../model/estado.model';
import { Cidade } from './../../model/cidade.model';

@Component({
  selector: 'app-cidade',
  templateUrl: './cidade.component.html',
  styleUrls: ['./cidade.component.css']
})
export class CidadeComponent implements OnInit {
  public cidades: Cidade[] = this.local.getCidadesByIDEstado(1);
  public estados: Estado[] = this.local.getEstados();
  public idSelectedCidade: number;
  public idSelectedEstado: number;

  constructor(private local: LocalizacaoService) {}

  ngOnInit() {
  }
}
