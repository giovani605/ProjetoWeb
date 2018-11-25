import { Component, OnInit, Input } from '@angular/core';
import { Prato } from 'src/app/model/prato.model';

@Component({
  selector: 'app-item-prato',
  templateUrl: './item-prato.component.html',
  styleUrls: ['./item-prato.component.css']
})
export class ItemPratoComponent implements OnInit {

  @Input('prato') prato: Prato;

  constructor() { }

  ngOnInit() {
  }
  getUrlImagem(img: String): String {
    return "http://localhost:3000/static/" + img;
  }
}
