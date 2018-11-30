import { Component, OnInit, Input } from '@angular/core';
import { Prato } from 'src/app/model/prato.model';

@Component({
  selector: 'app-modal-reserva',
  templateUrl: './modal-reserva.component.html',
  styleUrls: ['./modal-reserva.component.css']
})
export class ModalReservaComponent implements OnInit {
  @Input('prato')
  public prato: Prato;

  constructor() { }

  ngOnInit() {
  }

}
