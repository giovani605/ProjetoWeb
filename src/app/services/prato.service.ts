import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Prato } from '../model/prato.model';
import { Subject } from 'rxjs';
import { PratoDia } from '../model/pratoDia.model';
import { PeriodoPratoDia } from '../model/periodo.model';
import { DiaSemana } from '../model/diaSemana.model';

@Injectable({
  providedIn: 'root'
})
export class PratoService {

  constructor(private http: HttpClient) { }

  // chamar essa funcao com o prato com todos os dados
  inserirPrato(dadosPrato, Imagem, callback) {
    const fd = new FormData();
    const teste = JSON.stringify({ 'teste': 'oi' });
    fd.append('imagem', Imagem, 'imagem01.png');
    fd.append('dados', JSON.stringify(dadosPrato));
    fd.append('teste', teste);
    this.http.post('http://localhost:3000/prato/registrar', fd).subscribe(response => {
      console.log(response);
      callback(response);
    });
  }


  inserirPratoDiaSimples(pratoDia: PratoDia, callback) {
    this.http.post('http://localhost:3000/prato/periodo/simples', pratoDia).subscribe(response => {
      console.log(response);
      callback(response);
    });

  }

  filtrarDias(dias: DiaSemana[]) {
    var d: DiaSemana[] = [];
    for (let a of dias) {
      if (a.mark) {
        d.push(a);
      }
    }
    return d;
  }


  inserirPratoDiaCiclo(idUser, dadosPeriodo: PeriodoPratoDia, dias: DiaSemana[]) {
    var d = this.filtrarDias(dias);

    var dados = {
      "periodo": dadosPeriodo,
      "iduser": idUser,
      "dias": d
    }
    console.log(dados);

    var sub: Subject<any> = new Subject<any>();
    this.http.post('http://localhost:3000/prato/periodo/ciclo', dados).subscribe(response => {
      console.log(response);
      sub.next(response);
    });
    return sub;
  }

  converterPratoDadosBack(a) {
    const p = new Prato();
    p.descricao = a['descricao'];
    p.restaurante_idrestaurante = a['restaurante_idrestaurante'];
    p.idpratos = a['idpratos'];
    p.idimagem = a['idimagem'];
    p.nome = a['nome'];
    p.tag_idtag = a['tag_idtag'];
    return p;
  }
  converterPratoDiaDadosBack(a) {
    const p = new PratoDia();
    p.idprato_dia = a['idprato_dia'];
    p.idPrato = a['idprato'];
    p.data = a['data'];
    p.responsavel = a['responsavel'];
    p.aprovado = a['aprovado'];
    return p;

  }

  recuperarPratosRestaurante(idRestaurante) {
    const subject: Subject<Prato[]> = new Subject<Prato[]>();
    this.http.get('http://localhost:3000/prato/restaurante/' + idRestaurante).subscribe(response => {
      console.log(response['dados']);
      const lista: Prato[] = [];
      for (const a of response['dados']) {
        const b = this.converterPratoDadosBack(a);
        lista.push(a);
      }
      console.log('lista de pratos');
      console.log(lista);
      subject.next(lista);
    });
    return subject.asObservable();
  }

  recuperarPratoId(idPrato) {
    const subject: Subject<Prato> = new Subject<Prato>();
    this.http.get('http://localhost:3000/prato/' + idPrato).subscribe(response => {
      const b = this.converterPratoDadosBack(response['dados'][0]);
      console.log('prato');
      console.log(b);
      subject.next(b);
    });
    return subject.asObservable();

  }
}
