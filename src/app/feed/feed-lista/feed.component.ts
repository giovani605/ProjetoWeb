import { Component, OnInit } from '@angular/core';
import { FeedItem } from '../../model/feedItem.model';
import { FeedService } from 'src/app/services/feed.service';
import { Subject, Subscription } from 'rxjs';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  // lista do feed
  lista: FeedItem[] = [];
  constructor(private feedService: FeedService) { }

  ngOnInit() {
    const a: Subscription = this.feedService.recuperarFeedGeral().subscribe(dados => {
      this.lista = dados;
      a.unsubscribe();
    });
  }

}
