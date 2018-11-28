import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Prato } from '../model/prato.model';
import { Subject } from 'rxjs';
import { FeedItem } from '../model/feedItem.model';
import { PratoService } from './prato.service';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http: HttpClient,
    private pratoService: PratoService) { }

  recuperarFeedGeral() {
    const subject: Subject<FeedItem[]> = new Subject<FeedItem[]>();
    this.http.get('http://localhost:3000/feed').subscribe(response => {
      console.log(response['dados']);
      const lista: FeedItem[] = [];
      for (const a of response['dados']) {
        const b = this.pratoService.converterPratoDadosBack(a);
        const c = this.pratoService.converterPratoDiaDadosBack(a);
        const item: FeedItem = { 'prato': b , 'pratoDia' : c};
        lista.push(item);
      }
      console.log('lista de pratos');
      console.log(lista);
      subject.next(lista);
    });
    return subject.asObservable();
  }
}
