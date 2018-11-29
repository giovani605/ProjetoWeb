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
  private cidades: Cidade[];
  private estados: Estado[];
  private idSelectedCidade: number;
  private idSelectedEstado: number;


  constructor(private local: LocalizacaoService) { }

  ngOnInit() {
  }

}
