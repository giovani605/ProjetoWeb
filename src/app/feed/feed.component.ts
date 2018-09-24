import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  // lista do feed
  lista = ["1","2","3"];
  constructor() { }

  ngOnInit() {
  }

}
