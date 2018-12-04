import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Prato } from '../model/prato.model';
import { Subject } from 'rxjs';
import { FeedItem } from '../model/feedItem.model';
import { PratoService } from './prato.service';
import { Tag } from '../model/tag.model';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http: HttpClient,
    private pratoService: PratoService) { }

  recuperarFeedGeral() {
    var subject: Subject<FeedItem[]> = new Subject<FeedItem[]>();
    this.http.get('http://localhost:3000/feed').subscribe(response => {
      console.log(response['dados']);
      var lista: FeedItem[] = [];
      for (var a of response['dados']) {
        var b = this.pratoService.converterPratoDadosBack(a);
        var c = this.pratoService.converterPratoDiaDadosBack(a);
        var item: FeedItem = { 'prato': b, 'pratoDia': c };
        lista.push(item);
      }
      console.log('lista de pratos');
      console.log(lista);
      subject.next(lista);
    });
    return subject.asObservable();
  }

  recuperarFeedFiltro(listaTags: Tag[], idCidade) {
    var lTags = this.pratoService.filtrarTags(listaTags);
    var subject: Subject<FeedItem[]> = new Subject<FeedItem[]>();
    var dados: any = {
      "tags": lTags,
      "idCidade": idCidade
    };
    console.log(lTags);
    this.http.post('http://localhost:3000/feed/filtrar', dados).subscribe(response => {
      console.log(response['dados']);
      var lista: FeedItem[] = [];
      for (var a of response['dados']) {
        var b = this.pratoService.converterPratoDadosBack(a);
        var c = this.pratoService.converterPratoDiaDadosBack(a);
        var item: FeedItem = { 'prato': b, 'pratoDia': c };
        lista.push(item);
      }
      console.log('lista de pratos');
      console.log(lista);
      subject.next(lista);
    });
    return subject.asObservable();

  }

  recuperarFeedSeguir(idUser) {
    var subject: Subject<FeedItem[]> = new Subject<FeedItem[]>();
    console.log("recuperarFeedSeguir " + idUser);
    this.http.get('http://localhost:3000/feed/seguindo/' + idUser).subscribe(response => {
      console.log(response['dados']);
      var lista: FeedItem[] = [];
      for (var a of response['dados']) {
        var b = this.pratoService.converterPratoDadosBack(a);
        var c = this.pratoService.converterPratoDiaDadosBack(a);
        var item: FeedItem = { 'prato': b, 'pratoDia': c };
        lista.push(item);
      }
      console.log('lista de pratos');
      console.log(lista);
      subject.next(lista);
    });
    return subject.asObservable();

  }

}
