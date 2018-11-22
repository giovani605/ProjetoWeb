import { Component, OnInit } from '@angular/core';
import { FeedItem } from "../../model/feedItem.model";
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  // lista do feed
  lista: FeedItem[]  = [
    new FeedItem("Comida 1","Muito Boa",
    "https://www.receitas360.com.br/wp-content/uploads/2016/12/yakisoba-de-carne-186x190.jpg")
  ];
  constructor() { }

  ngOnInit() {
  }

}
