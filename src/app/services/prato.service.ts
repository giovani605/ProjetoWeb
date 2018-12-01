import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Prato } from '../model/prato.model';
import { Subject } from 'rxjs';
import { PratoDia } from '../model/pratoDia.model';
import { PeriodoPratoDia } from '../model/periodo.model';
import { DiaSemana } from '../model/diaSemana.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PratoService {

  constructor(private http: HttpClient,
    private userService: UserService) { }

  // chamar essa funcao com o prato com todos os dados
  inserirPrato(dadosPrato, Imagem, callback) {
    var fd = new FormData();
    var teste = JSON.stringify({ 'teste': 'oi' });
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
    var p = new Prato();
    p.descricao = a['descricao'];
    p.restaurante_idrestaurante = a['restaurante_idrestaurante'];
    p.idpratos = a['idpratos'];
    p.idimagem = a['idimagem'];
    p.nome = a['nome'];
    p.tag_idtag = a['tag_idtag'];
    return p;
  }
  converterPratoDiaDadosBack(a) {
    var p = new PratoDia();
    p.idprato_dia = a['idprato_dia'];
    p.idPrato = a['idprato'];
    p.data = a['dia'];
    p.responsavel = a['responsavel'];
    p.aprovado = a['aprovado'];
    return p;

  }
  converterPeriodoDadosBack(a) {
    var p = new PeriodoPratoDia();
    p.idperiodo = a['idperiodo'];
    p.idprato = a['idprato'];
    p.data_inicio = a['data_inicio'];
    p.data_fim = a['data_fim'];
    p.responsavel = a['responsavel'];
    p.aprovado = a['aprovado'];
    return p;

  }


  recuperarPratosRestaurante(idRestaurante) {
    var subject: Subject<Prato[]> = new Subject<Prato[]>();
    this.http.get('http://localhost:3000/prato/restaurante/' + idRestaurante).subscribe(response => {
      console.log(response['dados']);
      var lista: Prato[] = [];
      for (var a of response['dados']) {
        var b = this.converterPratoDadosBack(a);
        lista.push(a);
      }
      console.log('lista de pratos');
      console.log(lista);
      subject.next(lista);
    });
    return subject.asObservable();
  }

  recuperarPratoId(idPrato) {
    var subject: Subject<Prato> = new Subject<Prato>();
    this.http.get('http://localhost:3000/prato/' + idPrato).subscribe(response => {
      var b = this.converterPratoDadosBack(response['dados'][0]);
      console.log('prato');
      console.log(b);
      subject.next(b);
    });
    return subject.asObservable();

  }

  recuperarPratoDiaAprovar(idRestaurante) {
    var subject: Subject<any[]> = new Subject<any[]>();
    this.http.get('http://localhost:3000/restaurante/gerente/aprovar/simples/' + idRestaurante).subscribe(response => {
      console.log(response['dados']);
      var lista: any[] = [];
      for (var a of response['dados']) {
        var c = this.converterPratoDiaDadosBack(a);
        var r = this.userService.converterUser(a);
        var prato = this.converterPratoDadosBack(a);
        c.data = a["dia"];
        var item: any = { 'prato': prato, 'pratoDia': c, 'responsavel': r };
        lista.push(item);
      }
      console.log('lista de pratos Dia');
      console.log(lista);
      subject.next(lista);
    });
    return subject.asObservable();
  }

  
  recuperarPratoPeriodoAprovar(idRestaurante) {
    var subject: Subject<any[]> = new Subject<any[]>();
    this.http.get('http://localhost:3000/restaurante/gerente/aprovar/periodo/' + idRestaurante).subscribe(response => {

      var lista: any[] = [];
      for (var a of response['dados']) {
        var c = this.converterPeriodoDadosBack(a);
        var r = this.userService.converterUser(a);
        var prato = this.converterPratoDadosBack(a);
        console.log("periodo");
        var item: any = { 'prato': prato, 'periodo': c, 'responsavel': r };
        lista.push(item);
      }
      console.log('lista de pratos Periodo');
      console.log(lista);
      subject.next(lista);
    });
    return subject.asObservable();

  }

  aceitarPratoDiaSimples(idPratoDia, idUser) {
    var subject: Subject<any> = new Subject<any>();
    this.http.post('http://localhost:3000/restaurante/gerente/aprovar/simples/' + idPratoDia, { "idUser": idUser }).subscribe(response => {
      console.log('aceitarPratoDiaSimples');
      console.log(response);
      subject.next(response);
    });
    return subject.asObservable();

  }
  aceitarPeridoCiclo(idperiodo, idUser) {
    console.log("aprovar Periodo");
    var subject: Subject<any> = new Subject<any>();
    this.http.post('http://localhost:3000/restaurante/gerente/aprovar/periodo/' + idperiodo, { "idUser": idUser }).subscribe(response => {
      console.log('aceitarPratoDiaSimples');
      console.log(response);
      subject.next(response);
    });
    return subject.asObservable();

  }



}
