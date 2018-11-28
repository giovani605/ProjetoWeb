import { Component, OnInit, Input } from '@angular/core';
import { FeedItem } from '../../model/feedItem.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed-item',
  templateUrl: './feed-item.component.html',
  styleUrls: ['./feed-item.component.css']
})
export class FeedItemComponent implements OnInit {
  
  @Input('valor') item : FeedItem;
  constructor(private router:Router) { }

  ngOnInit() {
  }

  redirecionarRestaurante(event){
    console.log("oiew");
    this.router.navigate(['restaurante/'+this.item.prato.restaurante_idrestaurante]);
  }
}
