import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from 'src/app/model/usuario.model';

@Component({
  selector: 'app-item-usuario',
  templateUrl: './item-usuario.component.html',
  styleUrls: ['./item-usuario.component.css']
})
export class ItemUsuarioComponent implements OnInit {

  @Input('user')
  public user:Usuario =  new Usuario();

  constructor() { }

  ngOnInit() {
  }

}
