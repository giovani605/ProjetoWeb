import { Component, OnInit, Input } from '@angular/core';
import { FeedItem } from '../../model/feedItem.model';

@Component({
  selector: 'app-feed-item',
  templateUrl: './feed-item.component.html',
  styleUrls: ['./feed-item.component.css']
})
export class FeedItemComponent implements OnInit {
  
  @Input('valor') item : FeedItem;
  constructor() { }

  ngOnInit() {
  }

}
