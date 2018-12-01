import { Component, OnInit } from '@angular/core';
import { FeedItem } from '../../model/feedItem.model';
import { FeedService } from 'src/app/services/feed.service';
import { Subject, Subscription } from 'rxjs';
import { PratoService } from 'src/app/services/prato.service';
import { Tag } from 'src/app/model/tag.model';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  // lista do feed
  lista: FeedItem[] = [];
  public listaTags: Tag[] = [];
  constructor(private feedService: FeedService,
    private pratoService:PratoService) { }

  ngOnInit() {
    var a: Subscription = this.feedService.recuperarFeedGeral().subscribe(dados => {
      this.lista = dados;
      a.unsubscribe();
    });

    const subs2: Subscription = this.pratoService.recuperarTodasTag().subscribe(dados => {
      this.listaTags = dados;
      subs2.unsubscribe();
    });

  }
  atualizarFeed(){
    console.log("atualizar feed");
    const a: Subscription = this.feedService.recuperarFeedFiltro(this.listaTags).subscribe(dados => {
      this.lista = dados;
      a.unsubscribe();
    });
  }

}
