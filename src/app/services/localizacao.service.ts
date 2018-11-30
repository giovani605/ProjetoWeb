import { Estado } from './../model/estado.model';
import { Cidade } from './../model/cidade.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalizacaoService {
  constructor(private http: HttpClient) {}

  public getCidadeByIDCidade(id: number, callback) {
    this.http
      .get('http://localhost:3000/local/cidade/' + id)
      .subscribe(response => {
        console.log(response);
        callback(this.convertCidadeBack(response['dados']));
      });
  }

  public getCidades(callback) {
    this.http.get('http://localhost:3000/local/cidades').subscribe(response => {
      console.log(response);
      callback(this.convertCidadesBack(response['dados']));
    });
  }

  public getEstados(): Estado[] {
    let retorno: Estado[];
    this.http.get('http://localhost:3000/local/estados').subscribe(response => {
      console.log(response);
      retorno = this.convertEstadosBack(response['dados']);
    });
    return retorno;
  }

  public getCidadesByIDEstado(id: number): Cidade[] {
    let retorno: Cidade[];
    console.log('buscando as cidades por estado');
    this.http
      .get('http://localhost:3000/local/cidades/' + id)
      .subscribe(response => {
        console.log(response);
        retorno = this.convertCidadesBack(response['dados']);
      });
      return retorno;
  }

  private convertCidadesBack(dados): Cidade[] {
    const cidades: Cidade[] = [];

    for (const dado of dados) {
      cidades.push(this.convertCidadeBack(dado));
    }
    return cidades;
  }

  private convertCidadeBack(dado): Cidade {
    const cidade: Cidade = new Cidade();
    cidade.idCidade = dado['id'];
    cidade.nome = dado['nome'];
    cidade.idEstado = dado['estado_id'];
    return cidade;
  }

  private convertEstadosBack(dados): Estado[] {
    const estados: Estado[] = [];
    for (const dado of dados) {
      estados.push(this.convertEstadoBack(dado));
    }
    return estados;
  }

  private convertEstadoBack(dado): Estado {
    const estado: Estado = new Estado();
    estado.idEstado = dado['id'];
    estado.nome = dado['nome'];
    estado.sigla = dado['sigla'];
    return estado;
  }
}
